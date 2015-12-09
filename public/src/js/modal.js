var React = require('React'),
	M = require('react-modal-bootstrap'),
	$ = require('jQuery'),
	Modal = M.Modal,
	ModalClose = M.ModalClose;

var Mod = React.createClass({
	getInitialState:function(){
		return {
			text: "",
			attachments: []
		};
	},
	hideModal: function(){
		this.props.hideModal();
	},
	componentWillReceiveProps:function(nextProps){
		this.setState({
			text:'загрузка',
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
					text:'a',
					attachments:data.moment.attachments
				});
			}.bind(this)
		});
	},
	getImage: function(atts){
		var url;
		if(!atts.length){
			return 'No Image';
		}
		var images = atts.filter(function(att, i){
			return att.file.title.match(/\d+/g) ? false : true;
		});
		if(images.length){
			url = images[images.length-1].file.path;
		}else{
			url = atts[atts.length-1].file.path;
		}
		return <img src={url} className="img-rounded b-post__image"/>

	},
	render: function(){
		return(
			<Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal}>
				<div className='modal-header'>
					<ModalClose onClick={this.hideModal}/>
					<h4 className='modal-title'>{this.props.data.title}</h4>
				</div>
				<div className='modal-body'>
					{this.state.text}
					<div>{this.getImage(this.state.attachments)}</div>
				</div>
				<div className='modal-footer'>
					<button className='btn btn-default' onClick={this.hideModal}>
						Close
					</button>
					<button className='btn btn-primary'>
						Save changes
					</button>
				</div>
			</Modal>
		)
	}
});

module.exports = Mod;