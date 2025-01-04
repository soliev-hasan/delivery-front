import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ScreensParams = {
  Otp: undefined;
  SignUp: undefined;
  Main: undefined;
  BottomTab: undefined;
  Search: undefined;
  Profile: undefined;
  Cart: undefined;
  EditProfile: {
    newUser?: boolean;
  };
  Map: undefined;
  ProductDetail: {
    product: Object;
  };
  SubCategory: {
    categoryId: string;
    subcategoryId: string;
    title: string;
  }
  Payment: {
    total: any;
  };
};

export type RootRouteProps<RouteName extends keyof ScreensParams> = RouteProp<
  ScreensParams,
  RouteName
>;

export type RootNavigationProps<NavigationName extends keyof ScreensParams> =
  NativeStackScreenProps<ScreensParams, NavigationName>;
