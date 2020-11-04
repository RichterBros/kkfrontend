import React, { Fragment } from "react";
import {
    Alert
} from 'react-native';
import {observer} from 'mobx-react';
import ChoredBoardView from './ChoreBoardView'
import ChoredBoardView2 from './ChoreBoardView2'
import userRepository from "../../stores/UserDataStore";
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import choresRepository from "../../stores/DefaultChoresStore2";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {observable} from 'mobx';
@observer

class ChoreBoardContainer extends React.Component{
    handleChoreLongPress = (chore) => {
        Alert.alert(
            "Please Confirm",
            "Are you sure you wish to delete this chore?",
            [
                {text: 'Cancel', onPress: () => null, style: 'cancel'},
                {text: 'OK', onPress: () => familyUnitRepository.deleteChore(chore, userRepository.idToken)},
            ]
        );
    }
    handleChorePress = (choreId) => this.props.history.push(`/maintabscreen/editchore/${choreId}`);
    render(){
        return(
            <Fragment>
            
            {/* <View>
           
            <div>{choresRepository.chores}</div>
            </View> */}
            {/* <ChoredBoardView
                {...this.props}
                chores={familyUnitRepository.existingChores}
                kidsList={(familyUnitRepository.kidsList || [])}
                avatar={userRepository.avatar}
                
                navigateToEditChore={this.handleChorePress}
                deleteChore={this.handleChoreLongPress}
            /> */}
            <ChoredBoardView2
                {...this.props}
                chores={familyUnitRepository.existingChores}
                kidsList={(familyUnitRepository.kidsList || [])}
                avatar={userRepository.avatar}
                
                navigateToEditChore={this.handleChorePress}
                deleteChore={this.handleChoreLongPress}
            />
        </Fragment>
        );
    }
}

export default ChoreBoardContainer;