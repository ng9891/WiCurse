function helpMsg(msg) {
	msg.channel.send("```!wc get <discord tag> [f:YYYY-MM-DD] [t:YYYY-MM-DD] [word1] [word2] ... [word n]\
	\n\n<> means required\
	\n[] means optional\
	\n\nExamples:\
	\n\n!wc get @wizo#0006\
	\n!wc get @wizo#0006 total\
	\n!wc get @wizo#0006 sh!t fck d4mn\
	\n!wc get @wizo#0006 f:2019-08-01\
	\n!wc get @wizo#0006 t:2019-08-30\
	\n!wc get @wizo#0006 f:2019-08-01 t:2019-08-30\
	\n!wc get @wizo#0006 f:2019-08-01 t:2019-08-30 sh!t fck d4mn```");
}

module.exports = helpMsg;