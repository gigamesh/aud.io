import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { Link } from "react-router-dom";
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

class SearchBox extends React.Component<any, any> {
  input: any;
  state = {
    value: "",
    suggestions: []
  };

  renderInput = (inputProps: any) => {
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

  renderSuggestion = (suggestion: any, { query, isHighlighted }: any) => {
    const matches = match(suggestion.profilename, query);
    const parts = parse(suggestion.profilename, matches);

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
      <MenuItem
        selected={isHighlighted}
        component="div"
        // className={isHighlighted ? 'suggestionSelected' : ''}
      >
        <div>{finalSuggestion}</div>
      </MenuItem>
    );
  };

  renderSuggestionsContainer = (options: any) => {
    const { containerProps, children } = options;
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  };

  getSuggestionValue = (suggestion: any) => {
    return suggestion.profilename;
  };

  getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.props.suggestions.filter((suggestion: any) => {
          const keep =
            count < 5 &&
            suggestion.profilename.toLowerCase().slice(0, inputLength) ===
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

  handleSearchBoxChange = (e: any, { newValue, method }: any) => {
    if (method === "enter") {
    }
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (e: any, { suggestion }: any) => {
    this.props.history.push(`/user/${suggestion._id}`);
    this.setState({ value: "" });
    this.input.blur();
  };

  render() {
    const { classes } = this.props;

    return (
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
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        focusInputOnSuggestionClick={false}
        inputProps={{
          onFocus: this.props.searchBoxTouched,
          // type: "text",
          // id: "searchbox",
          // name: "searchbox",
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchBoxTouched: () => dispatch(searchBoxTouched()),
    searchBoxKeypress: (searchText: any) =>
      dispatch(searchBoxKeypress(searchText)),
    getUsers: () => dispatch(getUsers("")),
    clearSearchbox: () => dispatch(clearSearchbox())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SearchBox));
