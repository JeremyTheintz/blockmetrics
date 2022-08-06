import React, { FC } from 'react';
import Column from '../../../../styles/layout/Column';
import Flex from '../../../../styles/layout/Flex';
import Spacing from '../../../../styles/layout/Spacing';
import BMCardContainer from '../../../../styles/theme/components/BMCardContainer';
import BMExternalLink from '../../../../styles/theme/components/BMExternalLink';
import BMListItem from '../../../../styles/theme/components/BMListItem';
import BMText from '../../../../styles/theme/components/BMText';
import { EDirection, EFlex, ESize, ETextColor, ETextType, ETextWeight } from '../../../../styles/theme/utils/enum';
import { StyledList, StyledSubitemsList } from './DocumentationCard.styles';
import { IDocumentationCard } from './DocumentationCard.type';

const DocumentationCard: FC<IDocumentationCard> = ({ title, subtitle, items, ...otherProps }) => {
	return (
		<BMCardContainer isHighlighted animateApparition {...otherProps} marginTop={ESize['4xl']}>
			<Flex fullWidth direction={EFlex.column} padding={ESize['2xl']} mdPadding={ESize.l} smPaddingX={ESize.s}>
				<BMText as='h3' weight={ETextWeight.semiBold} size={ESize['2xl']}>
					{title}
				</BMText>

				{subtitle && (
					<>
						<Spacing size={ESize.s} />

						<Column columns={8}>
							<BMText as='h4' size={ESize.m} weight={ETextWeight.light}>
								{subtitle}
							</BMText>
						</Column>
					</>
				)}

				<StyledList marginTop={ESize.xl}>
					{items.map(({ label, highlightedValue, subitems }) => (
						<BMListItem key={label}>
							<BMText size={ESize.m} weight={ETextWeight.light}>
								{label}

								{highlightedValue && (
									<>
										<Spacing size={ESize.s} xsDirection={EDirection.horizontal} />
										<BMText
											type={ETextType.span}
											//size={ESize.m}
											weight={ETextWeight.semiBold}
											textColor={ETextColor.light}
										>
											{highlightedValue}
										</BMText>
									</>
								)}
							</BMText>

							{subitems && (
								<>
									<StyledSubitemsList>
										{subitems.map(({ value, isLink }) => (
											<li key={value}>
												{isLink ? (
													<BMExternalLink href={value} size={ESize.m} weight={ETextWeight.thin} />
												) : (
													<BMText size={ESize.m} weight={ETextWeight.thin} style={{ display: 'inline' }}>
														{value}
													</BMText>
												)}
											</li>
										))}
									</StyledSubitemsList>
								</>
							)}
						</BMListItem>
					))}
				</StyledList>
			</Flex>
		</BMCardContainer>
	);
};

export { DocumentationCard };
