import React, { Component } from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { createStackNavigator, navigate, NavigationActions, navigation } from 'react-navigation';

export default class ScheduleVetAppointment extends Component {

  state = {
    date: null
  }

  persistNextVetAppt = () => {
    if (this.state.date) {
      appoint = {
        last_vet_visit: this.state.date
      }
      fetch(`http://10.9.105.14:3000/api/v1/pets/${this.props.pet.id}`, {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appoint)
      })
    }
  }

  render(){
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <DatePicker
          style={{width: 200, backgroundColor: 'white', opacity: 0.9, borderRadius: 14}}
          date={this.state.date}
          mode="datetime"
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate={Date()}
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <TouchableOpacity style={{width: 100, height: 40, marginTop: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 14}} onPress={this.persistNextVetAppt}>
          <Text style={{textAlign: 'center', color: '#00b894', fontSize: 16}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
