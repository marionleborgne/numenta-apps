// Copyright © 2015, Numenta, Inc. Unless you have purchased from
// Numenta, Inc. a separate commercial license for this software code, the
// following terms and conditions apply:
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero Public License version 3 as published by the
// Free Software Foundation.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for more details.
//
// You should have received a copy of the GNU Affero Public License along with
// this program. If not, see http://www.gnu.org/licenses.
//
// http://numenta.org/licenses/

import Colors from 'material-ui/lib/styles/colors';
import Spacing from 'material-ui/lib/styles/spacing';

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#29aae2', // numenta blue : actions
    primary2Color: '#095c80', // darkened numenta blue : header
    primary3Color: Colors.lightBlack,
    accent1Color: '#29aae2', // numenta blue : actions
    accent2Color: Colors.lightBlue800,
    accent3Color: Colors.grey500, // neutral gray for small menu headings
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: Colors.grey300 // disabled light gray
  }
};
