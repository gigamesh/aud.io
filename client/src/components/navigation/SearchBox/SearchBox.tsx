import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../../store/reducers";
import { Link, Redirect } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  searchBoxTouched,
  searchBoxKeypress,
  clearSearchbox,
  getUsers
} from "../../../store/actions";
import { IUser, IObj } from "../../../typeDefs";

type Suggestion = Partial<IUser>;

const styles = (theme: any) =>
  createStyles({
    container: {
      flexGrow: 1,
      position: "absolute",
      width: "calc(100% - 28px)",
      top: 0,
      left: 0
    },
    suggestionsContainerOpen: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    suggestion: {
      display: "block"
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: "none"
    }
  });

const initialState = {
  value: "",
  suggestions: [],
  redirectID: ""
};

class SearchBox extends React.Component<IObj, typeof initialState> {
  input: HTMLInputElement | undefined;
  state = initialState;

  renderInput = (inputProps: IObj) => {
    const { classes, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: ref,
          classes: {
            input: classes.input
          },
          ...other
        }}
      />
    );
  };

  renderSuggestion = (
    suggestion: Suggestion,
    { query, isHighlighted }: IObj
  ) => {
    const matches = match(suggestion.profilename!, query);
    const parts = parse(suggestion.profilename!, matches);

    let compiledParts = parts.map((part, index) => {
      return part.highlight ? (
        <span key={String(index)} style={{ fontWeight: 500 }}>
          {part.text}
        </span>
      ) : (
        <strong key={String(index)} style={{ fontWeight: 300 }}>
          {part.text}
        </strong>
      );
    });

    let finalSuggestion = compiledParts.map((item, i) => {
      return (
        <Link to={`/user/${suggestion._id}`} key={i}>
          {item}
        </Link>
      );
    });

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>{finalSuggestion}</div>
      </MenuItem>
    );
  };

  renderSuggestionsContainer = (options: IObj) => {
    const { containerProps, children } = options;
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  };

  getSuggestionValue = (suggestion: Suggestion) => {
    return suggestion.profilename!;
  };

  getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.props.suggestions.filter((suggestion: Suggestion) => {
          const keep =
            count < 5 &&
            suggestion.profilename!.toLowerCase().slice(0, inputLength) ===
              inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
    this.props.searchBoxKeypress(value);
  };

  handleSuggestionsClearRequested = () => {
    this.props.clearSearchbox();
    this.setState({
      suggestions: []
    });
  };

  handleSearchBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { newValue, method }: IObj
  ) => {
    if (method === "enter") {
      console.log(newValue);
    }
    this.setState({
      value: newValue
    });
  };

  handleSelected = (e: IObj, rest: IObj) => {
    const { suggestion }: IObj = rest;
    this.setState({ value: "" });
    if (rest.method === "enter" && suggestion._id) {
      this.setState({ redirectID: suggestion._id });
    }
  };

  render() {
    const { classes } = this.props;

    return this.state.redirectID ? (
      <Redirect to={`/user/${this.state.redirectID}`} />
    ) : (
      <Autosuggest
        ref={(autosuggest: any) => {
          if (autosuggest !== null) {
            this.input = autosuggest.input;
          }
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.props.suggestions}
        onSuggestionSelected={this.handleSelected}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        focusInputOnSuggestionClick={false}
        inputProps={{
          onFocus: this.props.searchBoxTouched,
          classes,
          value: this.state.value,
          onChange: this.handleSearchBoxChange
        }}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    suggestions: state.search.searchResults
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    searchBoxTouched: () => dispatch(searchBoxTouched()),
    searchBoxKeypress: (searchText: string) =>
      dispatch(searchBoxKeypress(searchText)),
    getUsers: () => dispatch(getUsers("")),
    clearSearchbox: () => dispatch(clearSearchbox())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchBox));
