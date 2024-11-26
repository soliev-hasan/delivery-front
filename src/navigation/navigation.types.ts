import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type ScreensParams = {
  Otp: undefined;
  SignUp: undefined;
  Main: undefined;
};

export type RootRouteProps<RouteName extends keyof ScreensParams> = RouteProp<
  ScreensParams,
  RouteName
>;

export type RootNavigationProps<NavigationName extends keyof ScreensParams> =
  NativeStackScreenProps<ScreensParams, NavigationName>;
