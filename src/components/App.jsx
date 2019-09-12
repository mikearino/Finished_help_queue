import React from 'react';
import TicketList from './TicketList';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';
import NewTicketControl from './NewTicketControl';
import Error404 from './Error404';
import Moment from 'moment';
import Admin from './Admin';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  handleChangingSelectedTicket(ticket){
    this.setState({selectedTicket: ticket});
  }

  handleAddingNewTicketToList(newTicket){
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList, {
      [newTicket.id]: newTicket
    });
    newMasterTicketList[newTicket.id].formattedWaitTime = newMasterTicketList[newTicket.id].timeOpen.fromNow(true);
    this.setState({masterTicketList: newMasterTicketList});
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
    this .updateTicketElaspedWaitTime(),
    60000
    );
  }

  updateTicketElapsedWaitTime() {
    var newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    });
    this.setState({masterTicketList: newMasterTicketList});
  }

componentWillUnmount() {
  clearInterval(this.waitTimeUpdateTimer);
}
render() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' render={()=><TicketList ticketList={this.state.masterTicketList} />} />
        <Route path='/newticket' render={() => <NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList}/>} />
        <Route path='/admin' render={(props)=><Admin ticketList={this.state.masterTicketList} currentRouterPath={props.location.pathname}
        onTicketSelection={this.handleChangingSelectedTicket}
        selectedTicket={this.state.selectedTicket}/>} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}


}
export default App;
