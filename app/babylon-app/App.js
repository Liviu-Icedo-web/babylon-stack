import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ShowCountries from './src/screens/ShowCountries';

const navigator = createStackNavigator(
  {
    ResultsShow: ShowCountries
  }, 
  {
    initialRouteName: 'ResultsShow',
    defaultNavigationOptions: {
      title: 'Babylon Stack'
    }
  }
);

export default createAppContainer(navigator);
