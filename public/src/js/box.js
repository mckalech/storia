var $ = require('jQuery'),
	React = require('React'),
	Feed = require('./feed');
const RefreshIndicator = require('material-ui/lib/refresh-indicator');
var Box = React.createClass({
	getInitialState: function(){
		return {
			authorized: false
		};
	},
	componentDidMount: function(){
		var that = this,
		loginData = {
			password: "qwe123",
			remember: false,
			token: ""
		};
		$.ajax({
			url: 'https://storia.me/api/acl/auth/Selfish/test_task@example.com',
			method:'POST',
            dataType:"json",
			data:JSON.stringify(loginData),
			contentType:'application/json',
			xhrFields: {
				withCredentials: true
			},
			success:function(){
				that.setState({authorized:true});
			}
		})
	},
	render : function(){
		if(this.state.authorized){
			return (<Feed children={this.props.children}/>)
		}else{
			return(
				<RefreshIndicator status="loading" left={0} top={0} />
			)
		}
	}
});
module.exports = Box;
