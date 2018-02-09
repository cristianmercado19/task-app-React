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
import { ListController }
from 'task-app-pkg/dist/tasks-module/mvc/list/list.controller';
import { ListTask } from './list-task';
import { SummaryTask } from './summary-task';
import { SummaryController } from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.controller';

const logo = require('./logo.svg');

class App extends React.Component<Object, Object> {

  private addNewTaskController: AddNewTaskPassiveCotroller;
  private listController: ListController;
  private summaryController: SummaryController;

// tslint:disable-next-line:no-any
constructor(props: any) {
  super(props);

  const storeService = new TaskSimpleStoreService();
  const api = new TaskApiMock();
  const service = new InMemoryTaskService(api, storeService);

  this.addNewTaskController = new AddNewTaskPassiveCotroller(service);
  this.listController = new ListController(storeService);
  this.summaryController = new SummaryController(storeService);
}

  renderAddNewTask () {
    return (
      <AddNewTask
        controller={this.addNewTaskController}
      />
    );
  }

  renderList () {
    return (
      <ListTask
        controller={this.listController}
      />
    );
  }

  renderSummary () {
    return (
      <SummaryTask
        controller={this.summaryController}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {<img src={logo} className="App-logo" alt="logo" />}
          <h1 className="App-title">Welcome to task-app-React</h1>
        </header>
        <div className="App-intro">
          {this.renderAddNewTask()}
          {this.renderList()}
          {this.renderSummary()}
        </div>
      </div>
    );
  }
}

export default App;
