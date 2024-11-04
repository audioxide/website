export interface NavSection {
	name: string;
	link: string;
	subLinks?: NavLink[];
}

interface NavLink {
	name: string;
	link: string;
}
