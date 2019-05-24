// prescribercomments

<div class="presc-comm">
	<div class="text-align-center">
		<h3>{{prescriberComments.title}}</h3>
	</div>
    <p class="comments-font-size">{{prescriberComments.comments}}</p>
    <div class="rph-info">
        RPh:  <span>{{prescriberComments.rphName | rphName}}</span><span>{{prescriberComments.timestamp | dateFormat:'MM/dd/yyyy h:mm:ss a'}}</span>
    </div>
</div>

