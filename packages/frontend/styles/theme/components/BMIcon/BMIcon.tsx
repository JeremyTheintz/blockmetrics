import Image from 'next/image';
import React, { FC } from 'react';
import { EIcon, ESize } from '../../utils/enum';
import { StyledBackground, StyledIcon } from './BMIcon.styles';
import { IBMIcon } from './BMIcon.type';

const BMIcon: FC<IBMIcon> = ({
	type = EIcon.none,
	size = ESize.l,
	isVisible = true,
	backgroundVisible = false,
	backgroundRadius = ESize.s,
	backgroundSize = ESize.s,
	...otherProps
}) => {
	if (type === EIcon.none) {
		return <></>;
	}

	return (
		<StyledBackground
			backgroundVisible={backgroundVisible}
			backgroundRadius={backgroundRadius}
			backgroundSize={backgroundSize}
			isVisible={isVisible}
		>
			<StyledIcon size={size} {...otherProps}>
				<Image src={`/assets/icons/${type}.svg`} layout='fill' alt='' draggable={false} />
			</StyledIcon>
		</StyledBackground>
	);
};

export { BMIcon };
