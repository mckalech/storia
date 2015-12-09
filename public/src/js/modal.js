var React = require('React'),
	M = require('react-modal-bootstrap'),
	$ = require('jQuery'),
	Modal = M.Modal,
	Image = require('./image'),
	ModalClose = M.ModalClose;

var Mod = React.createClass({
	getInitialState:function(){
		return {
			attachments: []
		};
	},
	hideModal: function(){
		this.props.hideModal();
	},
	componentWillReceiveProps:function(nextProps){
		if(nextProps.isOpen == false){
			return;
		}else{
			this.setState({
				attachments:[]
			});
			$.ajax({
				url: nextProps.data.url,
				method:'GET',
				xhrFields: {
					withCredentials: true
				},
				success:function(data){
					this.setState({
						storyTitle: data.moment.storyTitle,
						owner: data.moment.owner.name,
						attachments: data.moment.attachments
					});
				}.bind(this)
			});
		}

	},

	render: function(){
		return(
			<Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal}>
				<div className='modal-header'>
					<ModalClose onClick={this.hideModal}/>
					<h4 className='modal-title'>{this.props.data.title}</h4>
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