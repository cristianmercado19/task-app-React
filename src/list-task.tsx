import { ListController } from 'task-app-pkg/dist/tasks-module/mvc/list/list.controller';
import { Task } from 'task-app-pkg/dist/tasks-module/entities/task.model';
import { ListView } from 'task-app-pkg/dist/tasks-module/mvc/list/list.view';

import * as React from 'react';

export interface Props {
    controller: ListController;
}

export interface State {
    tasks: Array<Task>;
}

export class ListTask extends React.Component<Props, State> implements ListView {

    constructor(props: Props) {
        super(props);
        this.state = {tasks: []};
    }

    componentDidMount() {
        this.props.controller.init(this);
    }

    updateList(newTasks: Task[]) {

        this.setState((prevState, props) => ({
            tasks: newTasks
        }));
    }

    render() {
        return (
            <div>
                <h3>ListComponent</h3>
                <ul>
                {this.state.tasks.map((task) =>
                    <li key={task.id}>
                        {task.name}
                    </li>
                )}
                </ul>
            </div>
        );
    }
}
