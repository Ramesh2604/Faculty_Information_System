import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import FacultyHomeScreen from './home';
import FacultyProfileScreen from './profilescreen';
import FacultyNotification from './notification';
const FacultyNavigatscreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home',unfocusedIcon: 'home-outline' },
    { key: 'notification', title: 'Notification', focusedIcon: 'bell'},
    { key: 'profile', title: 'Profile', focusedIcon: 'hail'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: FacultyHomeScreen,
    profile: FacultyProfileScreen,
    notification:FacultyNotification,
  });

  return (
    <BottomNavigation 
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default FacultyNavigatscreen;