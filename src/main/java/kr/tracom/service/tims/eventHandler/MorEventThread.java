package kr.tracom.service.tims.eventHandler;

import java.util.concurrent.ConcurrentLinkedQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import kr.tracom.beans.BeanUtil;
import kr.tracom.platform.net.protocol.TimsMessage;
import kr.tracom.platform.service.kafka.model.KafkaMessage;


public class MorEventThread extends Thread {

	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	MorEventHandler morEventHandler;
	private ConcurrentLinkedQueue<KafkaMessage> kafkaQ = new ConcurrentLinkedQueue<>();

	public MorEventThread(String sessionId) {
		this.morEventHandler = ((MorEventHandler)BeanUtil.getBean(MorEventHandler.class));
	}
	  
	private boolean bRunning = true;

	public void stop(boolean bStop) {
		bRunning = false;
	}

	@Override
	public void run() {

		while (bRunning) {

			if (getKafkaSize() > 0)
				logger.debug("HandleThread Running...kafkaQ.size:{}", getKafkaSize());

			try {
				KafkaMessage msg = getKafkaMessage();

				if (msg != null) {

					// logger.info("===================== START >> sessionId:{}", sessionId);

					String sessionId = msg.getSessionId();
					TimsMessage timsMessage = msg.getTimsMessage();

					morEventHandler.handle(timsMessage, sessionId);
				}

				Thread.sleep(1);

			} catch (InterruptedException e) {
				logger.error("Exception {}", e);
			}
		}

	}

	public void addKafkaMessage(KafkaMessage kafkaMessage) {
		kafkaQ.offer(kafkaMessage);
	}

	public KafkaMessage getKafkaMessage() {
		while (kafkaQ.peek() != null) {
			return kafkaQ.poll();
		}
		return null;
	}

	public int getKafkaSize() {
		return kafkaQ.size();
	}
}
