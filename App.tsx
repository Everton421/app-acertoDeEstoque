import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

import { MyDrawer } from './src/routes/drawer';
import { Routes } from './src/routes';


export default function App() {
  return (

<AuthProvider>
     <Routes/>
   
   </AuthProvider>
  
  );
}

