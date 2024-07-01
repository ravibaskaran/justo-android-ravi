import Snackbar from 'react-native-snackbar';
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, WHITE_COLOR } from '../utilities/constant';

const ErrorMessage = ({
    msg = '',
    backgroundColor = BLACK_COLOR,
    actionTxt = "",
    actionColor = "",
    onPressAction = () => { }
}) => Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: backgroundColor,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textColor: WHITE_COLOR,
    action: {
        text: actionTxt,
        textColor: actionColor,
        onPress: onPressAction,
    },
});

export default ErrorMessage;