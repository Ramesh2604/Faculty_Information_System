import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/welcomescreen';
import FirstScreen from './screens/firstscreen';
import Adminlogin from './admin/login';
import AdminHome from './admin/adminhome';
import Hod from './admin/hod';
import AddHod from './admin/addhod';
import Hodlogin from './hod/hodlogin';
import EditHod from './admin/edithod';
import Faculty from './admin/faculty';
import AddFaculty from './admin/AddFaculty';
import EditFaculty from './admin/EditFaculty';
import FacultyLogin from './faculty/facultylogin';
import HodHome from './hod/hodhome';
import FacultyHome from './faculty/facultyhome';
import AddDetails from './hod/adddetails';
import AddFacultyDetails from './faculty/addfacultydetails';
import FacultyDetails from './admin/facultydetails';
import HodDetails from './admin/hoddetails';
import AddDailyUpdate from './admin/adddailyupdate';
import ViewDailyUpdates from './admin/viewdailyupdate';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='FirstScreen' component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Adminlogin' component={Adminlogin} options={{ headerShown: false }} />
        <Stack.Screen name='Adminhome' component={AdminHome} options={{ headerShown: false }} />
        <Stack.Screen name='Hod' component={Hod} options={{ headerShown: true }} />
        <Stack.Screen name='FacultyDetails' component={FacultyDetails} options={{ headerShown: true }} />
        <Stack.Screen name='HodDetails' component={HodDetails} options={{ headerShown: true }} />
        <Stack.Screen name='AddHod' component={AddHod} options={{ headerShown: true }} />
        <Stack.Screen name='HodLogin' component={Hodlogin} options={{ headerShown: false }} />
        <Stack.Screen name='EditHod' component={EditHod} options={{ headerShown: false }} />
        <Stack.Screen name='Faculty' component={Faculty} options={{ headerShown: true }} />
        <Stack.Screen name='AddFaculty' component={AddFaculty} options={{ headerShown: false }} />
        <Stack.Screen name='EditFaculty' component={EditFaculty} options={{ headerShown: false }} />
        <Stack.Screen name='FacultyLogin' component={FacultyLogin} options={{ headerShown: false }} />
        <Stack.Screen name='HodHome' component={HodHome} options={{ headerShown: false }} />
        <Stack.Screen name='FacultyHome' component={FacultyHome} options={{ headerShown: false }} />
        <Stack.Screen name='AddDetails' component={AddDetails} options={{ headerShown: false }} />
        <Stack.Screen name='AddFacultyDetails' component={AddFacultyDetails} options={{ headerShown: false }} />
        <Stack.Screen name='AddDailyUpdate' component={AddDailyUpdate} options={{ headerShown: false }} />
        <Stack.Screen name='ViewDailyUpdates' component={ViewDailyUpdates} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


