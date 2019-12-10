import React, { Component }  from 'react';
import { AppLoading } from 'expo';
import { Image, ScrollView, Dimensions, FlatList, Switch, AsyncStorage} from 'react-native';
import { Container, Root, Toast, Header, Footer, FooterTab, View, List, Content, Button, Card, CardItem, Text, Body, Icon, Left, DeckSwiper, Thumbnail, ListItem, CheckBox, DatePicker, Fab} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, createStackNavigator, createAppContainer, DrawerItems, SafeAreaView   } from "react-navigation";
import {cards, caro} from "./data.json"


class LogoTitle extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
        <Icon name='menu' style={{ width: 30, height: 30 }} />
      </Button>
    );
  }
}

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      fontloaded: false,
      showToast: false,
      hello: ""
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }


onSwipeLeft = () => {
    alert("Swiped Left")
}

onSwipeRight = () => {
    alert("Swiped Right")
}

  storeData = async (k,v) => {
    try {
      await AsyncStorage.setItem(k, v);
    } catch (error) {
      console.log("No save!")
    }
  };

  retrieveData = async (k) => {
    try {
      const value = await AsyncStorage.getItem(k);
      if (value !== null) {
        this.setState({k: value});
      }
    } catch (error) {
      return value;
    }
  };



async componentDidMount() {
  await Font.loadAsync({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
  setState({ fontloaded: true });

}

static navigationOptions = ({ navigation }) => {
  return{
    headerTitle: <LogoTitle navigation={navigation}/>
  }

};

render() {
  if (!this.state.fontloaded) {
    return(<AppLoading/>);
  }
  const {width, heights} = Dimensions.get('window');
return(
<Root>
  <Container>
    <Content>
          <FlatList
            horizontal={true}
            data={caro}
            renderItem={({item}) =>
              <Card style={{ flex: 1, backgroundColor: "#f5f5f5",  width: width * 0.90 }}>
              <CardItem header bordered button onPress={() => alert("This is Card Header")} style={{ backgroundColor: "#f5f5f5" }}>
                <Left>
                  <Thumbnail source={{ uri: item.thumb }} />
                  <Body>
                      <Text>{item.title}</Text>
                    <Text note>{item.year}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{ uri: item.imageuri }} style={{height: 400, width: null, flex: 1 }} />
              </CardItem>
                <CardItem footer style={{ height: 100 }}>
                  <Text>{item.description}</Text>
              </CardItem>
            </Card>
            }
          />


      <Button primary onPress={() => Toast.show({ text: 'Wrong password!', duration: 3000, buttonText: 'Okay', buttonStyle: { backgroundColor: "#5cb85c" }, position: "top", textStyle: { color: "yellow" },})}>
        <Text>Primary 1</Text>
      </Button>
      <Button primary><Text> Primary 2</Text></Button>

      <ListItem>
        <CheckBox checked={true} color="green" onPress={() => this.setState({ checked: !this.checked })} />
        <Body>
          <Text>List 1</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={true} color="green" onPress={() => this.setState({ checked: !this.checked })} />
        <Body>
          <Text>List 2</Text>
        </Body>
      </ListItem>
      <ListItem>
        <CheckBox checked={this.state.checked} color="green" onPress={() => this.setState({ checked: !this.state.checked })} />
        <Body>
          <Text>List 3</Text>
        </Body>
      </ListItem>

      <DatePicker
        defaultDate={new Date(1990, 6, 14)}
        minimumDate={new Date(1990, 1, 1)}
        maximumDate={new Date(2019, 12, 31)}
        locale={"en"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"}
        placeHolderText="Select date"
        textStyle={{ color: "green" }}
        placeHolderTextStyle={{ color: "#d3d3d3" }}
        onDateChange={this.setDate}
        disabled={false}
      />

      <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text>

      <View style={{ minHeight: 500 }}>
        <DeckSwiper
          ref={(c) => this._deckSwiper = c}
          dataSource={cards}
          onSwipeLeft={() => alert("Swiped Left")}
          onSwipeRight={() => alert("Swiped Right")}
          renderItem={item =>
          <Card style={{ elevation: 0 }} >
            <CardItem button onPress={() => alert("DTF")}>
              <Left>
                <Thumbnail source={{ uri: item.image }} />
                  <Body>
                    <Text>{item.text}</Text>
                    <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={{uri: item.image}} />
              </CardItem>
              <CardItem button onPress={() => alert("oh yeah")}>
                <Icon name="add" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
          </Card>
        }/>
    </View>
    </Content>

    <Fab
      active={this.state.active}
      direction="up"
      containerStyle={{}}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight"
       onPress={() => this.setState({ active: !this.state.active })}>
      <Icon name="share" />
        <Button style={{ backgroundColor: '#34A34F' }} onPress={() => alert("Whats up, whatsapp?")}>
          <Icon name="logo-whatsapp" />
        </Button>
        <Button style={{ backgroundColor: '#3B5998' }} onPress={() => alert("wbu, fb?")}>
          <Icon name="logo-facebook" />
        </Button>
        <Button style={{ backgroundColor: '#DD5144' }} onPress={() => alert("email, fe-mail!")}>
          <Icon name="mail" />
        </Button>
    </Fab>

    <Footer>
      <FooterTab>
        <Button onPress={() => this.props.navigation.navigate('Details')}>
          <Icon name="apps" />
            <Text>Apps</Text>
        </Button>
        <Button>
          <Icon name="camera" />
            <Text>Camera</Text>
        </Button>
        <Button active>
          <Text>Navigate</Text>
        </Button>
        <Button>
          <Icon name="person" />
          <Text>Contact</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
  </Root>
    );}
}

class DetailsPage extends React.Component {

  render() {
    return (
      <Container>
        <Header>
          </Header>
        <Content>
        <List>
          <ListItem itemDivider>
            <Text>A</Text>
          </ListItem>
          <ListItem>
            <Text>Aaron Bennet</Text>
          </ListItem>
          <ListItem>
            <Text>Ali Connors</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text>B</Text>
          </ListItem>
          <ListItem>
            <Text>Bradley Horowitz</Text>
          </ListItem>
        </List>
        </Content>
      </Container>
    )}
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      switch0: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ fontloaded: true });
  }

  toggleSwitch = (value) => {

    this.setState({ switch0: value })
    alert("switch does nothing!")
  }

  render() {
    if (!this.state.fontloaded) {
      return (<AppLoading />);
    }
    const { navigation } = this.props

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, backgroundColor: 'white', flex: 1 }}>
          <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Joseph_Mallord_William_Turner_015.jpg/640px-Joseph_Mallord_William_Turner_015.jpg" }} style={{flex: 1}}>
          </Image>
        </View>
        <ScrollView>

        <View>
            <Button onPress={() => navigation.navigate('Home')}>
          <Text style={{ height: 35}}>
          Home
          </Text>
            </Button>
            <Button info onPress={() => navigation.navigate('Details')}>
            <Text style={{ height: 35 }}>
            Details
            </Text>
            </Button>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex:1 }}>
              <Text>Switch Me!</Text>
              <Switch value={this.state.switch0} trackColor={{ false: "red", true: "blue" }} onValueChange={this.toggleSwitch}/>
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
    )
  }
}



const AppNavigator = createStackNavigator({
  Home: {screen:Main},
  Details: {screen:DetailsPage},
});


const DrawerNavigator = createDrawerNavigator({
  Home: {screen:AppNavigator},
  Details: {screen:AppNavigator},
},

{ contentComponent: SideBar}

);


export default createAppContainer(DrawerNavigator)