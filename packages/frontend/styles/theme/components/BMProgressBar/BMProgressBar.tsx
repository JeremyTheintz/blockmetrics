import React, { FC } from 'react';
import HelpTooltip from '../../../../components/utils/HelpTooltip';
import Flex from '../../../layout/Flex';
import Spacing from '../../../layout/Spacing';
import { EFlex, ESize, ETextWeight } from '../../utils/enum';
import BMSkeleton from '../BMSkeleton';
import BMText from '../BMText';
import { StyledBMProgressBar } from './BMProgressBar.styles';
import { IBMProgressBar } from './BMProgressBar.type';

const BMProgressBar: FC<IBMProgressBar> = ({ label, size = ESize.s, value = 0, helpText, loading = false }) => {
	return (
		<Flex direction={EFlex.column} fullWidth>
			{label ? (
				<Flex horizontal={EFlex.between} vertical={EFlex.center}>
					<BMText size={size} weight={ETextWeight.medium}>
						{label}
					</BMText>

					{helpText && <HelpTooltip content={helpText} />}
				</Flex>
			) : (
				<></>
			)}

			<Spacing size={ESize['3xs']} />

			{loading ? (
				<BMSkeleton width='100%' height={size === ESize.s ? 10 : size === ESize.m ? 20 : 30} />
			) : (
				<StyledBMProgressBar value={value} size={size} />
			)}
		</Flex>
	);
};
export { BMProgressBar };
