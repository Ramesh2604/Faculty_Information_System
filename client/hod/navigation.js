import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreen from './home';
import ProfileScreen from './profilescreen';
import HodNotification from './hodnotification';
const Navigatscreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home',unfocusedIcon: 'home-outline' },
    { key: 'notification', title: 'Notification', focusedIcon: 'bell'},
    { key: 'profile', title: 'Profile', focusedIcon: 'hail'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    profile: ProfileScreen,
    notification: HodNotification,
  });

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navigatscreen;