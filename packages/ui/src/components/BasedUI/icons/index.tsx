import React, {
  CSSProperties,
  EventHandler,
  SyntheticEvent,
  FunctionComponent,
} from 'react'

import useHover from '../hooks/events/useHover'
import AddSvg from './Components/Add'
import AppleSvg from './Components/Apple'
import AudioFileSvg from './Components/AudioFile'
import CaptchaSvg from './Components/Captcha'
import CheckedSvg from './Components/Checked'
import ChevronLeftSvg from './Components/ChevronLeft'
import ChevronRightSvg from './Components/ChevronRight'
import ClapSvg from './Components/Clap'
import CloseSvg from './Components/Close'
import CollapseSvg from './Components/Collapse'
import CustomSvg from './Components/Custom'
import DashboardSvg from './Components/Dashboard'
import DateSvg from './Components/Date'
import DeleteSvg from './Components/Delete'
import DesktopSvg from './Components/Desktop'
import DotSvg from './Components/Dot'
import DownSvg from './Components/Down'
import DownThickSvg from './Components/DownThick'
import DragSvg from './Components/Drag'
import DuplicateSvg from './Components/Duplicate'
import EditNameSvg from './Components/EditName'
import EditSvg from './Components/Edit'
import EmailSvg from './Components/Email'
import EmptyLineSvg from './Components/EmptyLine'
import ExpandSvg from './Components/Expand'
import FontSvg from './Components/Font'
import GermanySvg from './Components/Germany'
import GlobeSvg from './Components/Globe'
import GoogleColorSvg from './Components/GoogleColor'
import GoogleSvg from './Components/Google'
import GraphSvg from './Components/Graph'
import GridSvg from './Components/Grid'
import HideSvg from './Components/Hide'
import ImageFileSvg from './Components/ImageFile'
import KeySvg from './Components/Key'
import LightningSvg from './Components/Lightning'
import ListSvg from './Components/List'
import LockSvg from './Components/Lock'
import LogicSvg from './Components/Logic'
import MicrosoftColorSvg from './Components/MicrosoftColor'
import MobileSvg from './Components/Mobile'
import MoreSvg from './Components/More'
import MultipleChoiceSvg from './Components/MultipleChoice'
import NetherlandsSvg from './Components/Netherlands'
import NewFlowSvg from './Components/NewFlow'
import NewTabSvg from './Components/NewTab'
import NewUserSvg from './Components/NewUser'
import NoInternetSvg from './Components/NoInternet'
import NoticiationsSvg from './Components/Notifications'
import OpenQuestionSvg from './Components/OpenQuestion'
import OverviewSvg from './Components/Overview'
import PolandSvg from './Components/Poland'
import RegisterSvg from './Components/Register'
import ResetSvg from './Components/Reset'
import ResultsSvg from './Components/Results'
import RussiaSvg from './Components/Russia'
import ScaleQuestionSvg from './Components/ScaleQuestion'
import SearchSvg from './Components/Search'
import SettingsSvg from './Components/Settings'
import ShowSvg from './Components/Show'
import ShowsSvg from './Components/Shows'
import SkipSvg from './Components/Skip'
import SleepSvg from './Components/Sleep'
import SmartCopySvg from './Components/SmartCopy'
import StarSvg from './Components/Star'
import TabletSvg from './Components/Tablet'
import TallySvg from './Components/Tally'
import ThankYouSvg from './Components/ThankYou'
import TimeSvg from './Components/Time'
import ToggleOffScreenSvg from './Components/ToggleOff'
import ToggleOnSvg from './Components/ToggleOn'
import UnitedKingdomSvg from './Components/UnitedKingdom'
import UnlockSvg from './Components/Unlock'
import UpArrowSvg from './Components/UpArrow'
import UpSvg from './Components/Up'
import UpTriangleSvg from './Components/UpTriangle'
import UploadSvg from './Components/Upload'
import VideoFileSvg from './Components/VideoFile'
import VideoSvg from './Components/Video'
import WaitingScreenSvg from './Components/WaitingScreen'
import WelcomeScreenSvg from './Components/WelcomeScreen'
import useMultipleEvents from '../hooks/events/useMultipleEvents'

import { Color } from '../theme'

export type SvgProps = {
  color?: Color
  framed?: boolean
  frameColor?: Color
  size?: number
}

type GenericEventHandler = EventHandler<SyntheticEvent>

export type Icon = FunctionComponent<IconProps>

export type IconStyleProps = {
  color?: Color
  framed?: boolean
  frameColor?: Color
  size?: number
}

export type IconProps = IconStyleProps & {
  style?: CSSProperties
  onDown?: GenericEventHandler
  hover?: boolean
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
  onClick?: GenericEventHandler
  draggable?: boolean
  onDragEnd?: GenericEventHandler
  onDrag?: GenericEventHandler
  onDragStart?: GenericEventHandler
  Svg?: FunctionComponent<SvgProps>
}

const EventIcon: Icon = ({
  color,
  framed = false,
  frameColor = { color: 'primary' },
  draggable = false,
  style,
  onClick,
  size = 24,
  Svg,
  onDown,
  onDrag,
  onDragStart,
  onMouseEnter,
  onDragEnd,
  onHover,
}) => {
  const [h, isHover] = useHover()

  if (!color) {
    if (framed) {
      color = { color: 'background', tone: 1 }
    } else {
      color = { color: 'foreground', tone: isHover ? 2 : 3 }
    }
  }

  let events: any = {}

  if (onClick) events.onClick = onClick
  if (onDown) events.onMouseDown = onDown
  if (onDrag) events.onDrag = onDrag
  if (onDragStart) events.onDragStart = onDragStart
  if (onDragEnd) events.onDragEnd = onDragEnd
  if (onMouseEnter) events.onMouseEnter = onMouseEnter
  if (onHover) events.onHover = onHover

  return (
    <div
      draggable={draggable}
      style={{
        cursor: (onDragStart || onDrag) && !onClick ? 'grab' : 'pointer',
        ...style,
      }}
      {...(Object.keys(events).length ? useMultipleEvents(events, h) : h)}
    >
      <Svg color={color} frameColor={frameColor} size={size} framed={framed} />
    </div>
  )
}

const SimpleIcon = ({
  color,
  framed = false,
  frameColor = { color: 'primary' },
  style,
  size = 24,
  Svg,
}) => {
  if (!color) {
    if (framed) {
      color = { color: 'background', tone: 1 }
    } else {
      color = { color: 'foreground', tone: 3 }
    }
  }
  return (
    <div style={style}>
      <Svg color={color} frameColor={frameColor} size={size} framed={framed} />
    </div>
  )
}

const Icon: Icon = (props) => {
  const { onClick, onDown, onDrag, onDragStart } = props
  return onClick || onDown || onDragStart || onDrag ? (
    <EventIcon {...props} />
  ) : (
    // @ts-ignore
    <SimpleIcon {...props} />
  )
}

const wrapIcon = (
  Svg: FunctionComponent<SvgProps>
): FunctionComponent<IconProps> => {
  return (props: IconProps) => {
    return <Icon {...props} Svg={Svg} />
  }
}

const Add = wrapIcon(AddSvg)
const Apple = wrapIcon(AppleSvg)
const AudioFile = wrapIcon(AudioFileSvg)
const Captcha = wrapIcon(CaptchaSvg)
const Checked = wrapIcon(CheckedSvg)
const ChevronLeft = wrapIcon(ChevronLeftSvg)
const ChevronRight = wrapIcon(ChevronRightSvg)
const Clap = wrapIcon(ClapSvg)
const Close = wrapIcon(CloseSvg)
const Collapse = wrapIcon(CollapseSvg)
const Custom = wrapIcon(CustomSvg)
const Dashboard = wrapIcon(DashboardSvg)
const Date = wrapIcon(DateSvg)
const Delete = wrapIcon(DeleteSvg)
const Desktop = wrapIcon(DesktopSvg)
const Dot = wrapIcon(DotSvg)
const Down = wrapIcon(DownSvg)
const DownThick = wrapIcon(DownThickSvg)
const Drag = wrapIcon(DragSvg)
const Duplicate = wrapIcon(DuplicateSvg)
const Edit = wrapIcon(EditSvg)
const EditName = wrapIcon(EditNameSvg)
const Email = wrapIcon(EmailSvg)
const EmptyLine = wrapIcon(EmptyLineSvg)
const Expand = wrapIcon(ExpandSvg)
const Font = wrapIcon(FontSvg)
const Germany = wrapIcon(GermanySvg)
const Globe = wrapIcon(GlobeSvg)
const Google = wrapIcon(GoogleSvg)
const GoogleColor = wrapIcon(GoogleColorSvg)
const Graph = wrapIcon(GraphSvg)
const Grid = wrapIcon(GridSvg)
const Hide = wrapIcon(HideSvg)
const ImageFile = wrapIcon(ImageFileSvg)
const Key = wrapIcon(KeySvg)
const Lightning = wrapIcon(LightningSvg)
const List = wrapIcon(ListSvg)
const Lock = wrapIcon(LockSvg)
const Logic = wrapIcon(LogicSvg)
const MicrosoftColor = wrapIcon(MicrosoftColorSvg)
const Mobile = wrapIcon(MobileSvg)
const More = wrapIcon(MoreSvg)
const MultipleChoice = wrapIcon(MultipleChoiceSvg)
const Netherlands = wrapIcon(NetherlandsSvg)
const NewFlow = wrapIcon(NewFlowSvg)
const NewTab = wrapIcon(NewTabSvg)
const NewUser = wrapIcon(NewUserSvg)
const NoInternet = wrapIcon(NoInternetSvg)
const Notifications = wrapIcon(NoticiationsSvg)
const OpenQuestion = wrapIcon(OpenQuestionSvg)
const Overview = wrapIcon(OverviewSvg)
const Poland = wrapIcon(PolandSvg)
const Register = wrapIcon(RegisterSvg)
const Reset = wrapIcon(ResetSvg)
const Results = wrapIcon(ResultsSvg)
const Russia = wrapIcon(RussiaSvg)
const ScaleQuestion = wrapIcon(ScaleQuestionSvg)
const Search = wrapIcon(SearchSvg)
const Settings = wrapIcon(SettingsSvg)
const Show = wrapIcon(ShowSvg)
const Shows = wrapIcon(ShowsSvg)
const Skip = wrapIcon(SkipSvg)
const Sleep = wrapIcon(SleepSvg)
const SmartCopy = wrapIcon(SmartCopySvg)
const Star = wrapIcon(StarSvg)
const Tablet = wrapIcon(TabletSvg)
const Tally = wrapIcon(TallySvg)
const ThankYou = wrapIcon(ThankYouSvg)
const Time = wrapIcon(TimeSvg)
const ToggleOff = wrapIcon(ToggleOffScreenSvg)
const ToggleOn = wrapIcon(ToggleOnSvg)
const UnitedKingdom = wrapIcon(UnitedKingdomSvg)
const Unlock = wrapIcon(UnlockSvg)
const Up = wrapIcon(UpSvg)
const UpArrow = wrapIcon(UpArrowSvg)
const UpTriangle = wrapIcon(UpTriangleSvg)
const Upload = wrapIcon(UploadSvg)
const Video = wrapIcon(VideoSvg)
const VideoFile = wrapIcon(VideoFileSvg)
const WaitingScreen = wrapIcon(WaitingScreenSvg)
const WelcomeScreen = wrapIcon(WelcomeScreenSvg)

const icons = {
  Add,
  Apple,
  AudioFile,
  Captcha,
  Checked,
  ChevronLeft,
  ChevronRight,
  Clap,
  Close,
  Collapse,
  Custom,
  Dashboard,
  Date,
  Delete,
  Desktop,
  Dot,
  Down,
  DownThick,
  Drag,
  Duplicate,
  Edit,
  EditName,
  Email,
  EmptyLine,
  Expand,
  Font,
  Germany,
  Globe,
  Google,
  GoogleColor,
  Graph,
  Grid,
  Hide,
  ImageFile,
  Key,
  Lightning,
  List,
  Lock,
  Logic,
  MicrosoftColor,
  Mobile,
  More,
  MultipleChoice,
  Netherlands,
  NewFlow,
  NewTab,
  NewUser,
  NoInternet,
  Notifications,
  OpenQuestion,
  Overview,
  Poland,
  Register,
  Reset,
  Results,
  Russia,
  ScaleQuestion,
  Search,
  Settings,
  Show,
  Shows,
  Skip,
  Sleep,
  SmartCopy,
  Star,
  Tablet,
  Tally,
  ThankYou,
  Time,
  ToggleOff,
  ToggleOn,
  UnitedKingdom,
  Unlock,
  Up,
  UpArrow,
  UpTriangle,
  Upload,
  Video,
  VideoFile,
  WaitingScreen,
  WelcomeScreen,
}

export type IconName =
  | keyof typeof icons
  | 'add'
  | 'apple'
  | 'audioFile'
  | 'checked'
  | 'chevronLeft'
  | 'chevronRight'
  | 'clap'
  | 'close'
  | 'collapse'
  | 'custom'
  | 'dashboard'
  | 'date'
  | 'delete'
  | 'desktop'
  | 'dot'
  | 'down'
  | 'downThick'
  | 'drag'
  | 'duplicate'
  | 'edit'
  | 'editName'
  | 'email'
  | 'emptyLine'
  | 'expand'
  | 'font'
  | 'germany'
  | 'globe'
  | 'google'
  | 'googleColor'
  | 'graph'
  | 'grid'
  | 'hide'
  | 'imageFile'
  | 'key'
  | 'lightning'
  | 'list'
  | 'lock'
  | 'logic'
  | 'microsoftColor'
  | 'mobile'
  | 'more'
  | 'multipleChoice'
  | 'netherlands'
  | 'newFlow'
  | 'newTab'
  | 'newUser'
  | 'noInternet'
  | 'notifications'
  | 'openQuestion'
  | 'overview'
  | 'poland'
  | 'register'
  | 'reset'
  | 'results'
  | 'russia'
  | 'scaleQuestion'
  | 'search'
  | 'settings'
  | 'show'
  | 'shows'
  | 'skip'
  | 'sleep'
  | 'smartCopy'
  | 'star'
  | 'tablet'
  | 'tally'
  | 'thankYou'
  | 'time'
  | 'toggleOff'
  | 'toggleOn'
  | 'unitedKingdom'
  | 'unlock'
  | 'up'
  | 'upArrow'
  | 'upTriangle'
  | 'upload'
  | 'video'
  | 'videoFile'
  | 'waitingScreen'
  | 'welcomeScreen'

const iconFromString = (
  input: IconName | string
): null | FunctionComponent<IconProps> => {
  if (input && typeof input === 'string') {
    return icons[input[0].toUpperCase() + input.slice(1)]
  } else {
    return null
  }
}

export {
  Add,
  Apple,
  AudioFile,
  Captcha,
  Checked,
  ChevronLeft,
  ChevronRight,
  Clap,
  Close,
  Collapse,
  Custom,
  Dashboard,
  Date,
  Delete,
  Desktop,
  Dot,
  Down,
  DownThick,
  Drag,
  Duplicate,
  Edit,
  EditName,
  Email,
  EmptyLine,
  Expand,
  Font,
  Germany,
  Globe,
  Google,
  GoogleColor,
  Graph,
  Grid,
  Hide,
  ImageFile,
  Key,
  Lightning,
  List,
  Lock,
  Logic,
  MicrosoftColor,
  Mobile,
  More,
  MultipleChoice,
  Netherlands,
  NewFlow,
  NewTab,
  NewUser,
  NoInternet,
  Notifications,
  OpenQuestion,
  Overview,
  Poland,
  Register,
  Reset,
  Results,
  Russia,
  ScaleQuestion,
  Search,
  Settings,
  Show,
  Shows,
  Skip,
  Sleep,
  SmartCopy,
  Star,
  Tablet,
  Tally,
  ThankYou,
  Time,
  ToggleOff,
  ToggleOn,
  UnitedKingdom,
  Unlock,
  Up,
  UpArrow,
  UpTriangle,
  Upload,
  Video,
  VideoFile,
  WaitingScreen,
  WelcomeScreen,
  iconFromString,
  icons,
}
