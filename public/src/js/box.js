var $ = require('jQuery'),
	React = require('React'),
	Feed = require('./feed'),
	cookies = require('browser-cookies');

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
			type:'POST',
            dataType:"json",
			data:JSON.stringify(loginData),
			contentType:'application/json',
			success:function(data){
				cookies.set('userId', data.userId);
				cookies.set('SSID', data.sessionId);
				cookies.set('accountId', data.accountId);
				that.setState({authorized:true});
			}
		})
	},
	render : function(){
		if(this.state.authorized){
			return (<Feed />)
		}else{
			return(
				<span>loging in</span>
			)
		}
	}
});
module.exports = Box;