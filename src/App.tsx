import * as React from 'react';
import './App.css';
import { AddNewTask } from './add-new-task';
import { AddNewTaskPassiveCotroller } 
from 'task-app-pkg/dist/tasks-module/mvc/add-new-task-passive/add-new-task-passive.controller';
import { TaskSimpleStoreService }
from 'task-app-pkg/dist/tasks-module/services/task-simple-store.service';
import { TaskApiMock }
from 'task-app-pkg/dist/tasks-module/api/task-mock.api';
import { InMemoryTaskService }
from 'task-app-pkg/dist/tasks-module/services/in-memory-task.service';
// import { SummaryController }
// from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.controller';
// import { ListController }
// from 'task-app-pkg/dist/tasks-module/mvc/list/list.controller';

const logo = require('./logo.svg');

class App extends React.Component<Object, Object> {

  private addNewTaskController: AddNewTaskPassiveCotroller;

// tslint:disable-next-line:no-any
constructor(props: any) {
  super(props);

  const storeService = new TaskSimpleStoreService();
  const api = new TaskApiMock();
  const service = new InMemoryTaskService(api, storeService);

  this.addNewTaskController = new AddNewTaskPassiveCotroller(service);
  // this.summaryController = new SummaryController(storeService);
  // this.listController = new ListController(storeService);
}

  renderAddNewTask () {

    return (
      <AddNewTask
        controller={this.addNewTaskController}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          {this.renderAddNewTask()}
        </div>
      </div>
    );
  }
}

export default App;
