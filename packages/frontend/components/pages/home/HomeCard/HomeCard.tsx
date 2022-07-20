import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMGradientSeparator from '../../../../styles/theme/components/BMGradientSeparator';
import BMHeading from '../../../../styles/theme/components/BMHeading';
import BMText from '../../../../styles/theme/components/BMText';
import { EChartType, EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import { axiosRest } from '../../../../utils/variables';
import BarChart from '../../../charts/BarChart';
import LineChart from '../../../charts/LineChart';
import { IHomeCardData } from '../HomeData/HomeData.type';
import { StyledIcon, StyledIconContainer } from './HomeCard.styles';
import CountUp from 'react-countup';
import { IDailyChangeValue, IHomeCardValue } from './HomeCard.type';
import { BMCardContainer } from '../../../../styles/theme/components/BMCardContainer';

const HomeCard: FC<IHomeCardData> = ({
	title,
	valueType,
	dailyChangeType,
	dailyCustomLabel = '24h',
	wsMessage,
	subscribeChannel,
	refreshTime = 0,
	unit,
	dailyChangeUnit,
	dailyChangeColorReversed,
	iconSrc,
	chartTitle,
	chartType,
	chartDataType,
	...otherProps
}) => {
	const [value, setValue] = useState<number>(0);
	const [updatedValue, setUpdatedValue] = useState<number>(0);
	const [dailyChange, setDailyChange] = useState<number>(0);
	const [updatedDailyChange, setUpdatedDailyChange] = useState<number>(0);

	const formattedValue = useMemo<IHomeCardValue>(() => {
		// convert value to ingeniery notation
		let newValue: number = updatedValue;
		let newUnit: string | undefined;
		let newIngValue: string | undefined;
		let hasDecimals: boolean = false;

		if (updatedValue >= 10 ** 15) {
			newValue = updatedValue / 10 ** 12;
			newIngValue = 'T';
		} else if (updatedValue >= 10 ** 12) {
			newValue = updatedValue / 10 ** 9;
			newIngValue = 'G';
		} else if (updatedValue >= 10 ** 9) {
			newValue = updatedValue / 10 ** 6;
			newIngValue = 'M';
		} else if (updatedValue >= 10 ** 6) {
			newValue = updatedValue / 10 ** 3;
			newIngValue = 'k';
		}

		if (newIngValue) {
			// round to 2 decimal places
			newValue = Math.round(newValue * 100) / 100;
			hasDecimals = true;
		}

		// add unit if needed
		if (unit) {
			newUnit = ` ${newIngValue || ''}${unit}`;
		} else if (newIngValue) {
			newUnit = ` ${newIngValue}`;
		}

		return {
			value: newValue,
			unit: newUnit || '',
			hasDecimals
		};
	}, [updatedValue, unit]);

	const formattedInitialValue = useMemo<number>(() => {
		// convert value to ingeniery notation
		let newValue: number = value;

		if (updatedValue >= 10 ** 15) {
			newValue = updatedValue / 10 ** 12;
		} else if (updatedValue >= 10 ** 12) {
			newValue = updatedValue / 10 ** 9;
		} else if (updatedValue >= 10 ** 9) {
			newValue = updatedValue / 10 ** 6;
		} else if (updatedValue >= 10 ** 6) {
			newValue = updatedValue / 10 ** 3;
		}

		// round to 2 decimal places
		newValue = Math.round(newValue * 100) / 100;

		return newValue;
	}, [value]);

	const formattedDailyChange = useMemo<IDailyChangeValue>(() => {
		// convert value to ingeniery notation
		let newValue: number = updatedDailyChange;
		let newUnit: string | undefined = '';

		// round to 2 decimal places
		newValue = Math.round(newValue * 100) / 100;

		// add unit if needed
		if (dailyChangeUnit) {
			if (dailyChangeUnit === '%') {
				newUnit = `${dailyChangeUnit}`;
			} else {
				newUnit = ` ${dailyChangeUnit}`;
			}
		}

		return {
			symbol: updatedDailyChange > 0 ? '+' : '',
			value: newValue,
			unit: newUnit,
			periodLabel: ' (' + dailyCustomLabel + ')'
		};
	}, [updatedDailyChange, dailyChangeUnit, dailyCustomLabel]);

	const formattedInitialDailyChange = useMemo<number>(() => {
		// convert value to ingeniery notation
		let newValue: number = dailyChange;

		// round to 2 decimal places
		newValue = Math.round(newValue * 100) / 100;

		return newValue;
	}, [dailyChange]);

	const dailyTextColor = useMemo(() => {
		let positive = ETextColor.positive;
		let negative = ETextColor.negative;

		if (dailyChangeColorReversed) {
			positive = ETextColor.negative;
			negative = ETextColor.positive;
		}

		if (dailyChange > 0) {
			return positive;
		} else if (dailyChange < 0) {
			return negative;
		}

		return ETextColor.default;
	}, [dailyChange, dailyChangeColorReversed]);

	const fetchValue = useCallback(async () => {
		try {
			const { data } = await axiosRest('/get/blockchains/total?type=' + valueType);
			setValue(data.value || 0);
			setUpdatedValue(data.value || 0);
		} catch (err) {
			console.error('HomeCard fetchData', err);
		}
	}, [valueType]);

	const fetchDailyChange = useCallback(async () => {
		try {
			const { data } = await axiosRest('/get/blockchains/total?type=' + dailyChangeType);

			setDailyChange(data.value || 0);
			setUpdatedDailyChange(data.value || 0);
		} catch (err) {
			console.error('HomeCard fetchData', err);
		}
	}, [valueType]);

	const updateValue = useCallback(
		(newValue: number) => {
			setUpdatedDailyChange(newValue);
			setUpdatedValue(Number(value) + newValue);
		},
		[value]
	);

	useEffect(() => {
		if (subscribeChannel && wsMessage?.channel === subscribeChannel) {
			const numberMessage = parseInt(wsMessage?.data, 10);

			updateValue(numberMessage);
		}
	}, [wsMessage, value]);

	useEffect(() => {
		valueType && fetchValue();
	}, [fetchValue, valueType]);

	useEffect(() => {
		dailyChangeType && fetchDailyChange();
	}, [fetchDailyChange, dailyChangeType]);

	return (
		<BMCardContainer as='li' {...otherProps}>
			<Flex>
				<StyledIconContainer>
					<StyledIcon src={iconSrc} alt='' />
				</StyledIconContainer>

				<Spacing size={ESize.s} />

				<Flex direction={EFlex.column}>
					<BMText size={ESize.m} weight={ETextWeight.light}>
						{title}
					</BMText>

					<Spacing size={ESize.xs} mdSize={ESize['3xs']} />

					<BMHeading type={ETextType.h3} weight={ETextWeight.semiBold}>
						<CountUp
							preserveValue={true}
							start={formattedInitialValue}
							end={formattedValue.value}
							duration={refreshTime}
							decimals={formattedValue.hasDecimals ? 2 : 0}
							suffix={formattedValue.unit}
							separator=','
							style={{ color: 'inherit' }}
						/>
					</BMHeading>

					<Spacing size={ESize.xs} mdSize={ESize['3xs']} />

					{dailyChange ? (
						<BMText size={ESize.s} weight={ETextWeight.light} textColor={dailyTextColor}>
							<CountUp
								preserveValue={true}
								start={formattedInitialDailyChange}
								end={formattedDailyChange.value}
								duration={refreshTime}
								decimals={0}
								prefix={formattedDailyChange.symbol}
								suffix={formattedDailyChange.unit + formattedDailyChange.periodLabel}
								separator=','
								style={{ color: 'inherit' }}
							/>
						</BMText>
					) : (
						<></>
					)}
				</Flex>
			</Flex>

			<BMGradientSeparator margin={ESize.xl} mdMargin={ESize.s} lgMargin={ESize.m} />

			<BMText size={ESize.m} weight={ETextWeight.medium}>
				{chartTitle}
			</BMText>

			<Spacing size={ESize.xs} />

			{chartType === EChartType.line ? (
				<LineChart dailyType={chartDataType} deactivateLegend chartHeight={120} />
			) : chartType === EChartType.bar ? (
				<BarChart dailyType={chartDataType} deactivateLegend chartHeight={120} />
			) : (
				<></>
			)}
		</BMCardContainer>
	);
};

export { HomeCard };
