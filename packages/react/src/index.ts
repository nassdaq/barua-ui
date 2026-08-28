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

export { Icon, iconNames } from "./icon";
export type { IconName, IconProps } from "./icon";

export { block } from "./primitive";
export type { BlockProps } from "./primitive";

export {
  Stack, VStack, HStack, Grid, Container, ScrollArea, Divider, Stage, Spacer, Grow,
  Split, Section, SafeArea, CardGrid, Bento, Dashboard, Span, Workspace, WorkspaceMain,
  Inspector, SkipLink, Sidebar, SidebarHeading, SidebarGroup, SidebarItem,
} from "./layout";
export type { StackProps, GridProps, ContainerProps, ScrollAreaProps, DividerProps, SpanProps, SidebarProps, SidebarItemProps } from "./layout";

export {
  Text, Link, LinkGroup, Kbd, Overline, Footnote, Footnotes, Quote, CodeBlock, DescriptionList,
} from "./typography";
export type { TextProps, TextRole, QuoteProps, CodeBlockProps, DescriptionListProps } from "./typography";

export {
  Table, TableWrap, TableNum, TableSortHeader, Gauge, Donut, Sparkline, Legend,
  Columns, Bars, Chart, ChartTip, Heatmap,
} from "./data";
export type { TableProps, GaugeProps, DonutProps, DonutSlice, SparklineProps, LegendProps, LegendItem, ColumnsProps, BarsProps } from "./data";

export {
  TopNav, TopNavBrand, TopNavLinks, TopNavLink, BottomNav, BottomNavItem, Dock, DockItem,
  DockTray, PillNav, BackButton, MarketingNav, MarketingNavBrand, MarketingNavLinks,
  Steps, Drawer, DrawerHeader, DrawerBody, StatusBar, StatusBarItem,
  Menu, MenuItem, MenuLabel, MenuSeparator, Dropdown,
} from "./navigation";
export type { NavLinkProps, Step, StepsProps, DrawerProps, MenuProps, MenuItemProps, DropdownProps } from "./navigation";

export {
  Form, FormRow, FormSection, FormActions, Fieldset, Label, Help, ErrorText, Optional,
  InputGroup, StepperInput, Range, Dropzone, Upload, UploadItem, FilterBar, FilterChip,
  Swatches, Swatch, SearchField,
} from "./forms-extra";
export type { FormSectionProps, LabelProps, InputGroupProps, StepperInputProps, RangeProps, DropzoneProps, UploadItemProps, FilterChipProps } from "./forms-extra";

export {
  Kanban, KanbanColumn, KanbanList, Task, TaskList, TaskRow, DataGrid, Tree, TreeItem,
  Timeline, Feed, Log, BulkActions, SelectionCount, Resizable, ResizeHandle, DragHandle,
  FileTile, FileGrid, FileBrowser,
} from "./productivity";
export type { KanbanColumnProps, TaskProps, TreeItemProps, TimelineProps, TimelineEntry, FileTileProps } from "./productivity";

export {
  Landing, Chapter, Hero, Figure, FeatureRow, PromoBand, SpecStrip, CardRail,
  SiteFooter, SiteFooterGroups, SiteFooterGroup, SiteFooterHeading, SiteFooterLegal,
} from "./marketing";
export type { ChapterProps, HeroProps, FigureProps, FeatureRowProps, PromoBandProps } from "./marketing";

export {
  Auth, AuthCard, Result, SysPage, Banner, Callout, Notification, Onboarding,
  OnboardingHero, AppGrid, AppTile, Wall, GlassContainer,
} from "./system";
export type { AuthCardProps, ResultProps, SysPageProps, BannerProps } from "./system";

export {
  CommandPalette, CommandInput, CommandList, CommandItem, CommandGroupLabel, CommandFooter, HoverCard,
} from "./command";
export type { CommandPaletteProps, CommandItemProps } from "./command";

export {
  ButtonGroup, SplitButton, ToggleButton, SortControl, Share,
  Accordion, Disclosure,
  Calendar, CalendarHeader, CalendarGrid, CalendarMonth, CalendarWeekday, CalendarDay,
  DatePicker, CalendarView, CalendarViewHead, CalendarViewCell, Event,
  Combobox, ComboboxList, ComboboxOption, ComboboxEmpty, SearchResults, SearchResult,
  Carousel, CarouselTrack, CarouselSlide, CarouselDots, Gallery, ImageViewer,
  ImageViewerBar, Lightbox, UploadPreviews, UploadPreview,
  Account, AccountSwitcher, CommandCenter, Gantt, GanttRow, GanttBar,
  HoverCardHost, GlassInteractive, Rail, RailItem, OnboardingFeature,
} from "./extras";
export type {
  ButtonGroupProps, SplitButtonProps, ToggleButtonProps, DisclosureProps, CalendarDayProps,
  EventProps, ComboboxOptionProps, SearchResultProps, LightboxProps, RailProps, AccountProps,
  OnboardingFeatureProps,
} from "./extras";

export {
  MediaPlaceholder, AsyncImage, Web, Video, Audio, Waveform, Thumb,
  CircularProgress, Axis, RadarChart, LineChart, AreaChart, ScatterChart, GridLines,
  MenuBar, MenuBarItem, Pagination, PaginationItem, PaginationEllipsis, LiquidToggle,
  CommandCenterTile, CommandCenterLabel, CommandCenterStatus, ImageLens,
} from "./media";
export type { ThumbProps, CircularProgressProps, AxisProps, PaginationProps, PaginationItemProps, LiquidToggleProps } from "./media";

export { cn } from "./cn";
