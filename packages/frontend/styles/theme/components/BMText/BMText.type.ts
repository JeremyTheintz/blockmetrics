import { ESize, ETextAlign, ETextColor, ETextType, ETextWeight } from '../../utils/enum';

interface IBMText {
	children: React.ReactNode | string;
	type?: ETextType;
	textColor?: ETextColor;
	size?: ESize;
	textAlign?: ETextAlign;
	href?: string;
	disabled?: boolean;
	underline?: boolean;
	isExternal?: boolean;
	weight?: ETextWeight;
	style?: string;
	singleLine?: boolean;
	className?: string;
	inheritStyle?: boolean;
	decoration?: boolean;
	opacityReduced?: boolean;
	as?: any;
}

export type { IBMText };
