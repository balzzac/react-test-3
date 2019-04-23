import React, { Component } from 'react';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import ImageResults from '../image-results/ImageResults';

export default class Search extends Component {
  state = {
    searchText: '',
    amount: 10,
    apiURL: 'https://pixabay.com/api',
    apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // insert your Pixabay key
    images: []
  };

  onChangeText = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val) {
        axios
          .get(
            `${this.state.apiURL}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      } else {
        this.setState({ images: [] });
      }
    });
  };

  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onChangeText}
          floatingLabelText="Search for Images"
          fullWidth={true}
        />

        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem primaryText="5" value={5} />
          <MenuItem primaryText="10" value={10} />
          <MenuItem primaryText="20" value={20} />
          <MenuItem primaryText="30" value={30} />
          <MenuItem primaryText="40" value={40} />
          <MenuItem primaryText="50" value={50} />
        </SelectField>
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
