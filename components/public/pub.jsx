import React, {
	Component
} from 'react';

import $ from 'jquery';

export let PubCom = ComponsedComponent => class extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}


	componentWillMount() {

	}

	formatNumber(s) {
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
		var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1];
		var t = "";
		for (var i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("");
	}



	render() {


		let methods = {

			formatNumber: this.formatNumber

			//fillFeilds:this.fillFeilds
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
	}
}