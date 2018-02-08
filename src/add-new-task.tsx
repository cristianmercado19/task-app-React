import * as React from 'react';
import { AddNewTaskPassiveView }
    from 'task-app-pkg/dist/tasks-module/mvc/add-new-task-passive/add-new-task-passive.view';
import { AddNewTaskPassiveCotroller }
    from 'task-app-pkg/dist/tasks-module/mvc/add-new-task-passive/add-new-task-passive.controller';

export interface Props {
    controller: AddNewTaskPassiveCotroller;
}

export interface State {
    viewModel: AddNewTaskPassiveModel;
}

export class AddNewTaskPassiveModel {
    isLock = false;
    taskName: string;
    maxLengthTaskName = 100000;
    errorMessageVisible = false;
    successMessageVisible = false;
    errorMessage = '';
    successMessage = '';

    setSuccessMessage(message: string) {
        this.successMessage = message;
        this.showSuccess();
    }

    setErrorMessage(message: string) {
        this.errorMessage = message;
        this.showError();
    }

    private showError() {
        this.errorMessageVisible = true;
        this.successMessageVisible = false;
    }
    private showSuccess() {
        this.successMessageVisible = true;
        this.errorMessageVisible = false;
    }
}

export class AddNewTask extends React.Component<Props, State> implements AddNewTaskPassiveView {
    private viewModel = new AddNewTaskPassiveModel();

    constructor(props: Props) {
        super(props);
        this.state = {viewModel: new AddNewTaskPassiveModel()};

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.controller.init(this);
    }

    setMaxLenghTaskName(maxLength: number) {
        this.viewModel.maxLengthTaskName = maxLength;
        this.updateState();
    }

    lock(): void {
        this.viewModel.isLock = true;
        this.updateState();        
    }
    getTaskName(): string {
        return this.viewModel.taskName;
    }
    unlock(): void {
        this.viewModel.isLock = false;
        this.updateState();        
    }
    showSuccessfulMessageOnAddNewTask(taskId: number) {
        this.viewModel.setSuccessMessage('A new task has been added with id: ' + taskId);
        this.updateState();    
    }
    showErrorMessageOnAddNewTask() {
        this.viewModel.setErrorMessage('An error ocurred, the service is unavailable');
        this.updateState();    
    }

    onAddTaskClick() {
        this.props.controller.onAddTaskEvent();
    }

    // tslint:disable-next-line:no-any
    handleChange(e: any) {
        this.viewModel.taskName = e.target.value;
        this.updateState();        
    }

    render() {
        return (
            <div>
                <h3>Add New Task Component</h3>

                <label>Task name:</label>
                <input 
                    name="taskName"
                    onChange={this.handleChange}
                />

                <button onClick={() => this.onAddTaskClick()}>
                    Add Task
                </button>

                <div>
                    {this.state.viewModel.errorMessage}
                </div>

                <div>
                    {this.state.viewModel.successMessage}
                </div>
            </div>
        );
    }

    private updateState() {
        this.setState((prevState, props) => ({
            viewModel: this.viewModel
        }));

    }
}
