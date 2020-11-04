// import React from 'react';
import { Alert, Platform} from 'react-native';
import AddChildView from './AddChildView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";
// import CreateChoreView from './CreateChoreView';
import React, { Fragment } from 'react'
import CreateChoreContainer from '../ChoreBoard/CreateChoreContainer'

const defaultFormState = {
    dobM: Platform.OS === 'ios' ? 1 : "",
    dobD: Platform.OS === 'ios' ? 1 : "",
    dobY: Platform.OS === 'ios' ? new Date().getFullYear() : "",
    gender: ""
};


class AddChildContainer extends React.Component{
    state = {
        firstName: "",
        ...defaultFormState,
        modalVisible: false,
        modalText: "Child added!",
        chore: "wash car"
    }
    modalClose = () => {
        console.log("modalClose handler called");
        this.setState(()=> ({modalVisible: false}));
    }
    addAnotherChild = () => this.setState(() => ({ ...defaultFormState, modalVisible: false}));
    returnToDashboard = () => {
        this.setState(() => ({modalVisible: false}));
        if (this.props.history) {
            console.log("#############attempting redirect");
            this.props.history.push('/maintabscreen/choreboard');
        }
        else{
            console.log("#############attempting redirect, failed");
        }
    }

    onDeleteChild = (child) => {
        Alert.alert('Confirm child Deletion', `Are you sure you wish to remove ${child.name} from this family unit?`, [
            {text: "Ok", onPress: ()=>familyUnitRepository.deleteChild(child._id, userRepository.idToken)},
            {text: "Cancel", onPress: () => ""}
        ]);
    }
    updateForm = (prop, newValue) => {
        this.setState({[prop]: newValue});
    }
    isValidDOB(dob) {
        const numeric = dob.split("-").map(Number);
        return numeric.length === 3 && numeric.every(num => num > 0) && numeric[0] < 13 && numeric[1] < 32 && numeric[3] <= new Date().getFullYear();
    }
    onAddChild = async () => {
        console.log("ONADDCHILD CALLED")
        const {firstName, dobM, dobD, dobY, gender} = this.state;
        const dob = `${dobM}-${dobD}-${dobY}`;
        if (!firstName || !dob || !gender) return Alert.alert("Invalid input", "Please fill out all fields.");
        if (this.isValidDOB(dob)) return Alert.alert("Invalid DOB", "Please enter date of birth in format mm/dd/yyyy");
        const idToken = userRepository.idToken;
        const saveResult = await familyUnitRepository.addChild(firstName, dob, gender==="m" ? "male" : "female", idToken);
        if (!saveResult) return Alert.alert("Server Error", "Please try again later");
       
    //  familyUnitRepository.addChore(choreData, idToken);
       
 


        console.log(this.state.chore);
        console.log("add Child Result", saveResult);
        this.setState(() => ({modalVisible: true}))
        
        // this.setState(() => ({ firstName: "", dob: "", gender: ""}));
        // this.showAlert();
    }
    render() {
      
      return (
            <Fragment>
            <AddChildView
                {...this.state}
                kidsList={familyUnitRepository.kidsList}
                onChangeText={this.updateForm}
                onAddChild={this.onAddChild}
                onDeleteChild={this.onDeleteChild}
                
                modalClose={this.modalClose}
                modalAccept={this.addAnotherChild}
                modalDeny={this.returnToDashboard}
            />
            
            {/* <CreateChoreView/> */}
            
            
            
            
            </Fragment>
        );
    }
}

export default observer(AddChildContainer);