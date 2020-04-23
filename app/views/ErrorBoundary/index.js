import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Headline, Button, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, errorCount: 0};
  }

  clearError() {
    this.setState({hasError: false, errorCount: this.state.errorCount++});
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: this.props.theme.colors.background,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              size={200}
              name="emoticon-sad-outline"
              color={this.props.theme.colors.primary}
            />
            <Headline style={{textAlign: 'center', marginBottom: 16}}>
              Something went wrong...
            </Headline>
            <Button
              loading={this.state.hasError ? false : true}
              mode="outlined"
              onPress={() => this.clearError()}>
              Try again
            </Button>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <React.Fragment key={this.state.errorCount}>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default withTheme(ErrorBoundary);
