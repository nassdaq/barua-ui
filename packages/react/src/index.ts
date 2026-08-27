// Barua UI — React bindings over the pure-CSS system.
// import "barua-ui/css"; once, then compose.

export { BaruaProvider, useBaruaTheme, ThemeScript } from "./provider";
export type { BaruaProviderProps, BaruaTheme, BaruaAccent } from "./provider";
export { ToastProvider, useToast } from "./toast";
export type { ToastOptions, ToastVariant } from "./toast";

export { Button, ButtonLink, Fab, Toolbar, buttonClasses } from "./actions";
export type { ButtonProps, ButtonLinkProps, ButtonVariant, ButtonSize, FabProps } from "./actions";

export {
  Field, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, OtpInput,
} from "./forms";
export type { FieldProps, InputProps, CheckboxProps, SwitchProps, OtpInputProps } from "./forms";

export {
  Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle, CardEyebrow,
  StoryCard, Badge, Tag, Chip, Avatar, AvatarGroup, IconTile, List, ListItem,
  ListHeader, ListFooter, GroupBox, Labeled, Stat, EmptyState,
} from "./content";
export type { CardProps, BadgeProps, ChipProps, AvatarProps, IconTileProps, ListProps, ListItemProps } from "./content";

export { Alert, Progress, Spinner, Skeleton, StatusDot, Tip, LinearGauge } from "./feedback";
export type { AlertProps, ProgressProps } from "./feedback";

export { Modal, AlertDialog, Sheet, BottomSheet, ActionSheet, Popover, Tooltip } from "./overlays";
export type { ModalProps, AlertDialogAction, ActionSheetAction, PopoverProps } from "./overlays";

export { Segmented, Tabs, TabPanel, Breadcrumbs } from "./nav";
export type { SegmentedOption, TabItem, Crumb } from "./nav";

export { cn } from "./cn";
