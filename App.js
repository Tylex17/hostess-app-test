import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {QuotesScreen, AboutScreen} from './src/screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import aboutIcon from './src/assets/aboutIcon/aboutIcon.png';
import quoteIcon from './src/assets/quoteIcon/quoteIcon.png';
import {tabEnum} from './src/enums/tab-enum';
import {Footer} from './src/components/footer';

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <Footer {...props} />}>
          <Tab.Screen
            name={tabEnum.QuotesTab}
            component={QuotesScreen}
            options={{
              tabBarLabel: 'Котировки',
              icon: quoteIcon,
            }}
          />
          <Tab.Screen
            name={tabEnum.AboutTab}
            component={AboutScreen}
            options={{
              tabBarLabel: 'О приложении',
              icon: aboutIcon,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
