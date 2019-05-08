/**
 * Genevieve Twohig
 * Date: 05/07/2019
 * Version: 1.0
 * Description: TimeInput component to let the user input a time. Format is HH:MM
 */

import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';

const styles = (theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing.unit,
        },
    });

type maskArray = Array<string | RegExp>;

interface ITimeInputProps extends WithStyles<typeof styles> {
    classes: any;
    value?: string;
    timeRegex?: maskArray | ((value: string) => maskArray); // Use this if a different regex is needed but still using this same component. To change the 
                                                            // regex altogether, go to the render() and change it there 
    guide?: boolean;
    placeholderChar?: string;
    keepCharPositions?: boolean;
    // pipe?: (
    //     conformedValue: string,
    //     config: any
    // ) => false | string | { value: string; indexesOfPipedChars: number[] };
    showMask?: boolean;
    // render?: (ref: (inputElement: HTMLElement) => void, props: any) => any;
}

interface ITimeInputState {
    value: string;
    timeRegex: maskArray | ((value: string) => maskArray);
}

class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {
    constructor(props: ITimeInputProps) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            value: (this.props.value) ? this.props.value : "",
            timeRegex: (this.props.timeRegex) ? this.props.timeRegex : [/[0-9]/, /[0-9]/, ":", /[0-9]/, /[0-9]/]
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    public handleChange = (event: any) => {
        this.setState({ value: event.target.value });
    }; 3:23

    public handleBlur = (event: any) => {
        const inputStr = event.target.value.replace(":", "").trim();
        let hours = parseInt(inputStr.slice(0, -2));
        let str = inputStr;

        const inputStrWColon = event.target.value;
        let firstIndex = parseInt(inputStrWColon.slice(0, 1));
        let secondIndex = parseInt(inputStrWColon.slice(1, 2));
        let thirdIndex = parseInt(inputStrWColon.slice(3, 4));
        let fourthIndex = parseInt(inputStrWColon.slice(4, 5));

        let hours1 = parseInt(inputStr.slice(0, 1));
        let hours2 = parseInt(inputStr.slice(1, 2));
        let minutes = parseInt(inputStr.slice(2, 5));
        // Checks that the hours is not bigger than 24 or that the minutes is not bigger than 59
        if (str.length == 4 && hours2 >= 4 && hours1 >= 2 && !isNaN(fourthIndex) ||  minutes > 59) {
            alert("Hours error");
            this.setState({ value: "" });
        }
        // If the user inputs 3 characters, checks that the seecondIndex is less than 5
        // So, an example is if the user inputs 950 it becomes 09:50 but if the user inputs 960 
        // an alert will come up. Note: the largest minutes value is 59
        else if (str.length == 3 && isNaN(fourthIndex) && hours2 > 5) {
            alert("Minutes error");
            this.setState({ value: ""});
        }
        else {
            // Checks that the input is not of the following format: '1 :3 '      // This was used before when showMask was off but it isn't needed now since you put a space in the beginning of the file
            if ((isNaN(fourthIndex) && str.length == 3 && !isNaN(secondIndex))) { //  || (isNaN(firstIndex) && str.length == 3)) {
                // If the user inputs 3 characters, prepend a 0 -> example: user inputs: 120 becomes 01:20
                if (hours < 10) {
                    str = "0" + str;
                    this.setState({ value: str });
                }
            }
            // Checks if the length is 4 and that there are no spaces in the string
            else if (str.length == 4 && !isNaN(firstIndex) && !isNaN(secondIndex) && !isNaN(thirdIndex) && !isNaN(fourthIndex)) {
                this.setState({ value: str });
            }
            // Otherwise, TimeInput will give an alert if there are white spaces in unusual places
            else {
                alert("Invalid input: whitepace error");
                this.setState({ value: "" });
            }
        }
    }; 

    public render() {
        const { classes } = this.props
        const regex = [/[0-9]/, /[0-9]/, ":", /[0-9]/, /[0-9]/]; // Used to check that the input is in this form

        return (
            <div className={classes.container}>
                <FormControl className={classes.formControl} variant="outlined">
                    <MaskedInput
                        onChange={this.handleChange}
                        mask={regex}
                        // mask={this.state.timeRegex}
                        onBlur={this.handleBlur}
                        placeholderChar={'\u2000'} // Removes underlines
                        // showMask // Commenting this allowed the cursor to be in the start of the field
                        value={this.state.value}
                    />
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(TimeInput);
