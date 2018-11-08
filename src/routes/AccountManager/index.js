import React from 'react';
import AccountManagerView from './AccountManagerView';
import familyUnitRepository from "../../stores/FamilyUnitDataStore";
import {observer} from "mobx-react";
import userRepository from "../../stores/UserDataStore";

@observer
class AccountManager extends React.Component{
    switchToChild = async (childId) => {
        userRepository.switchBrowsingMode(this.props.history, childId)
    }
    render() {
        return (
            <AccountManagerView
                {...this.props}
                kidsList={familyUnitRepository.kidsList}
                switchToChild={this.switchToChild}
            />
        );
    }
}

export default AccountManager;