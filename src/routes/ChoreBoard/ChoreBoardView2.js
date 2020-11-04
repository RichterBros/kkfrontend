import React, { Fragment } from "react";
import {
    View,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Text from '../../common/KKText';
import ItemTile from "../../common/ItemTile";
import Header from "../../common/Header";
import SwipableKidSelection from "../../common/SwipableKidSelection";
import EmptyState from "../../common/EmptyState";
import {fountainBlue, lightGrey} from "../../colors";
import {scaleRatio} from "../../configuration";
import choresRepository from "../../stores/DefaultChoresStore";
import CreateChoreView2 from './CreateChoreView2';
import CreateChoreView from './CreateChoreView';
import CreateChoreContainer2 from './CreateChoreContainer2';
import KKButton from "../../common/KKButton";
import {observer} from "mobx-react";
import {observable} from 'mobx';
{/* <View >
<KKButton type={"primary"} onPress={!CreateChoreView2.submitting ? CreateChoreView2.submitChore : ()=>""}>
        {CreateChoreView2.submitting? 'SAVE' : 'SAVE'}
    </KKButton>
</View> */}

  





const ChoreBoardView2 = ({match:{path}, chores=[], kidsList=[], deleteChore, navigateToEditChore, ...props}) => (
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Header leftAction={"avatarButton"} rightAction="addChore" />
        <Text style={{color: fountainBlue,fontSize: 18 * scaleRatio, textAlign: 'center'}}>Chore Board--+</Text>
        
        <KKButton type={"primary"} onPress={ !CreateChoreView2.submitting ? CreateChoreView2.submitChore : ()=>""}>
          {CreateChoreView2.submitting? 'SAVE' : 'Add Default Chore'} 
         
        </KKButton> 
        
        {
            kidsList.length === 0 ?
                <EmptyState loading={false} /> :
                chores.length === 0 ?
                    <EmptyState loading={false} type={"chores"}/> :
                    <SwipableKidSelection
                        kidsList={kidsList.toJS?kidsList.toJS():[]}
                        renderContents={renderChoresList(kidsList, chores, deleteChore, navigateToEditChore)}
                        isSelectionNullable={true}
                    />
        }
    </View>
);

const renderChoresList = (kidsList=[], chores=[], deleteChore, navigateToEditChore) => selectedChildId =>
    chores.length > 0 ?
        <ScrollView style={{flex:1, alignSelf: 'stretch'}}>
           
          
            {
                chores
                    .filter(chore => !chore.deleted)
                    .filter(chore => {
                        let kidsWithThisChore = kidsList.filter(kid => (kid.assignedChores||[]).includes(chore._id)).map(kid => kid._id);
                        return kidsWithThisChore.includes(selectedChildId) || selectedChildId === null;
                    })
                    .map((chore) => {
                        let kidsWithThisChore = kidsList.filter(kid => (kid.assignedChores||[]).includes(chore._id));
                        if (kidsWithThisChore.length === 0) kidsWithThisChore = [{name: "Not assigned"}];
                        return (
                         <Fragment>
                      
                        
                            <TouchableOpacity onPress={()=>navigateToEditChore(chore._id)} onLongPress={()=>deleteChore(chore)} key={chore._id}>
                                <ItemTile
                                    mainCaption={chore.name}
                                    subCaption={kidsWithThisChore.map(kid => kid.name).join(", ")}
                                />
                            
                          
                            </TouchableOpacity>
                            </Fragment>
                        );
                    })
            }
       
        </ScrollView> :
        <Text style={styles.label}> No chores yet. Create chores by tapping the top right button </Text>

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    label: {
        color: lightGrey,
        alignSelf: 'stretch',
        textAlign: 'center',
        marginHorizontal: width * 0.03,
        fontSize: 14.4 * scaleRatio,
        marginTop: height * 0.02
    },
});

export default ChoreBoardView2;