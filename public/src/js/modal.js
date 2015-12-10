var React = require('React'),
	M = require('react-modal-bootstrap'),
	$ = require('jQuery'),
	Modal = M.Modal,
	Image = require('./image'),
	ModalClose = M.ModalClose;

var Mod = React.createClass({
	getInitialState:function(){
		return {
			isOpen:true,
			attachments: []
		};
	},
	hideModal: function(){
		this.setState({
				isOpen: false
			});
		setTimeout(function(){
			this.props.history.pushState(null, '/');
		}.bind(this),0);

	},
	componentDidMount:function(){

		this.setState({
			attachments:[]
		});
		var url = "https://storia.me/api/core/stories/"+this.props.params.storyId+'/moments/'+this.props.params.id;
		$.ajax({
			url: url,
			method:'GET',
			xhrFields: {
				withCredentials: true
			},
			success:function(data){
				this.setState({
					title: data.moment.title,
					storyTitle: data.moment.storyTitle,
					owner: data.moment.owner.name,
					attachments: data.moment.attachments
				});
			}.bind(this)
		});


	},

	render: function(){
		return(
			<Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
				<div className='modal-header'>
					<ModalClose onClick={this.hideModal}/>
					<h4 className='modal-title'>{this.state.title}</h4>
				</div>
				<div className='modal-body'>
					<div>
						История: <b>{this.state.storyTitle}</b>
					</div>
					Автор: <i>{this.state.owner}</i>
					<Image attachments={this.state.attachments} />
				</div>
			</Modal>
		)
	}
});

module.exports = Mod;