import { SummaryView } from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.view';
import { SummaryController } from 'task-app-pkg/dist/tasks-module/mvc/summary/summary.controller';

import * as React from 'react';

export interface Props {
    controller: SummaryController;
}

export interface State {
    total: number;
}

export class SummaryTask extends React.Component<Props, State> implements SummaryView {

    constructor(props: Props) {
        super(props);
        this.state = {total: 0};
    }

    componentDidMount() {
        this.props.controller.init(this);
    }

    setTotalCount(newTotal: number): void {
        this.setState((prevState, props) => ({
            total: newTotal
        }));
    }

    render() {
        return (
            <div>
                <h3>Summary component</h3>
                <h5>Total: {this.state.total}</h5>
            </div>
        );
    }
}