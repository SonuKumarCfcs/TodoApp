
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import constants from './src/constants';




class TodoList extends React.Component {

  state={
  DATA:[],
  selectArr:[],
  text:'',
}

updatedata=(val)=>{
  if(val=='')
  {
    Alert.alert("Please Add Todo");
  }
  else{
    let id=Math.floor((Math.random() * 10) + 1);
    let newArr=[...this.state.DATA,{id:id,task:val}]
    //console.log("NewArr==>",newArr)
    this.setState({
    DATA:newArr,
    text:''
    })
  }
 
  
}
alldeletedata=()=>{
  // let lenght=this.state.DATA.length;
  // console.log("Lenght==>",lenght)
   //let newArr=this.state.selectArr.splice(index,lenght);
   //console.log("deletedData==>",newArr)
//debugger;
   //let newArr=this.state.DATA.filter((i,index)=>{
    //  console.log("selectArrID==>>",this.state.selectArr[index].id)
    //  console.log("itemID==>>",i.id)
  //   if(index==this.state.selectArr.length){
  //     return;
  //   }
  //   debugger;
  //   return(i?.id!=this.state.selectArr[index]?.id)
  // })
  // console.log("newArr==>",newArr);
  // this.setState({
  //   DATA:[...newArr] 
  // })
  // console.log("updateDATA=>=>",this.state.DATA);
  let alldata=[...this.state.DATA];
  let smalldata=[...this.state.selectArr];
  let len1=alldata.length;
  let len2=smalldata.length;
  let tempArr=[];
  for(let i=0;i<len1;i++){
    let tempVar=alldata[i];
    let find=false;
    for(let j=0;j<len2;j++){
      if(smalldata[j].id==tempVar.id){
        find=true;
        break;
      }
    }
    if(find==false){
      tempArr.push(tempVar);
    }
  }
  this.setState({
    DATA:[...tempArr],
    selectArr:[],
  })

}


singledeletedata=(id)=>{
 
  let newArr=this.state.DATA.filter(i=>{
    return(i.id!=id)
  })
  console.log("singleDeletion==>",newArr)
  this.setState({
    DATA:newArr
  })

}
removeTick=(item)=>{
  let id=item.id;
  let find=-1;
  for(let i=0; i<this.state.selectArr.length ;i++){
    if(id==this.state.selectArr[i].id){
        find=i;
        break;
    }
  }
   let delTick=[...this.state.selectArr];
   delTick.splice(find,1);
   console.log("delTick==>",delTick);
  this.setState({
    selectArr:delTick
  })
 
}

  render(){
    //console.log("text==>",this.state.text)
    console.log("data==>",this.state.DATA)
    console.log("selectArr==>",this.state.selectArr)

   
   
    return (
      <SafeAreaView style={styles.conatiner}>
        <View style={styles.headerArrange}>
          <Text style={styles.todoStyle}>{constants.String.todoList}</Text>
          <TouchableOpacity onPress={()=>{this.alldeletedata()}}>
            <Image source={constants.Image.delete}/>
          </TouchableOpacity>
          
        </View>
        <FlatList
            data={this.state.DATA}
            renderItem={val=>{
              const item=val.item;
              //console.log("Id==>",item.id);
             
              let find=false;
              
                for(let i=0; i<this.state.selectArr.length ;i++){
                  if(item.id==this.state.selectArr[i].id){
                      find=true;
                      break;
                  }
                }
                
              
              
              return(
                <TouchableOpacity onPress={()=>{ 
                  console.log("find==>",find)
                  console.log("indexItem==>",val.index)
                  if(find){
                    this.removeTick(item)
                  }
                  else{
                    this.setState({
                      selectArr:[...this.state.selectArr,item]
                    })
                  }
                }}>
                <View style={styles.cardStyle}>
                  <View style={styles.boxArr}>
                    <Text>{item.task}</Text>
                    <View style={styles.imageArr}>
                     
                        { find ?
                          <Image source={constants.Image.check} style={styles.checkimageSize}/> : null

                        }
                      
                     
                            <TouchableOpacity onPress={()=>{this.singledeletedata(item.id)}}>
                              <Image source={constants.Image.delete} style={{tintColor:'red'}}/>  
                            </TouchableOpacity>
                         
                    </View>
                  </View>  
                </View>
                </TouchableOpacity>
              );
            }}
        />
        <TextInput
          style={styles.textInputstyle}
          placeholder={"Add Text Here"}
          value={this.state.text}
          onChangeText={(val)=>{
            this.setState({
              text:val,
            })
          }}
        />
        <TouchableOpacity  
        //disabled={this.state.text=='' ? true : false}
        style={styles.plusstyle}
        onPress={()=>{this.updatedata(this.state.text)}}>
          <Image source={constants.Image.plus} />
        </TouchableOpacity>
        {/* */}
        
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    backgroundColor: constants.Colors.white,
    alignItems:'center'
  },
  todoStyle:{
    fontSize: constants.vw(20),
    fontWeight:'500',
    
  },
  headerArrange:{
    flexDirection:'row',
    width: constants.vw(320),
    justifyContent:'space-between',
    //paddingHorizontal: constants.vw(20),
    //backgroundColor:'red',
  },
  cardStyle:{
    width: constants.vw(320),
    height: constants.vh(50),
    //backgroundColor:'red',
    marginTop:constants.vh(10),
    borderColor: constants.Colors.grey,
    borderWidth:0.4,
    borderRadius: constants.vw(10),
    alignItems:'center',
    justifyContent:'center'
  },
  checkimageSize:{
    width: constants.vw(18),
    height: constants.vh(18)
  },

  imageArr:{
    flexDirection:'row',
    alignItems:'center'
  },
  boxArr:{
    flexDirection:'row',
    alignItems:'center',
    width: constants.vw(280),
    justifyContent:'space-between',
    //backgroundColor:'red'
  },
  textInputstyle:{
    width: constants.vw(280),
    height: constants.vh(40),
    borderColor: constants.Colors.grey,
    borderWidth:0.4,
    borderRadius: constants.vw(10),
    padding : constants.vw(10)
  },
  plusstyle:{
    width: constants.vw(22),
    height: constants.vh(22),
    position:'absolute',
    bottom:'6%',
    right:'3%',
  }
  
});

export default TodoList;
