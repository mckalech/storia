var React = require('React');

var Post = React.createClass({
	getInitialState: function(){
		return {
			likes: this.props.data.stats.likes
		};
	},
	getImage: function(){
		var atts = this.props.data.attachments,
			url;
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
	handleLikeClick:function(){
		this.setState({
			likes: this.state.likes+1
		})
	},
	render : function(){
		return(
			<div className="panel panel-info">
				<div className="panel-heading">
					<h3 className="panel-title">{this.props.data.title}</h3>
				</div>
				<div className="panel-body">
					<div><b>{this.props.data.storyTitle}</b> <i>{this.props.data.owner.name}</i></div>
					<div>{this.getImage()}</div>
				</div>
				<div className="panel-footer" onClick={this.handleLikeClick}>{this.state.likes} likes</div>
			</div>
		)
	}
});
module.exports = Post;