package edu.wgu.d387_sample_code;

import edu.wgu.d387_sample_code.i18n.IntroductionController;
import edu.wgu.d387_sample_code.i18n.IntroductionMessage;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SpringBootApplication
public class D387SampleCodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(D387SampleCodeApplication.class, args);


		// Create instances of DisplayMessage for each locale
		IntroductionMessage displayMessage_fr_CA = new IntroductionMessage();
		IntroductionMessage displayMessage_en_US = new IntroductionMessage();

		// Create threads for each locale and start them
		ExecutorService messageExecutor = Executors.newFixedThreadPool(2);
		messageExecutor.execute(() -> {
			displayMessage_fr_CA.getWelcomeMessage("fr_CA");
			System.out.println(displayMessage_fr_CA.getWelcomeMessage("fr_CA"));
		});
		messageExecutor.execute(() -> {
			displayMessage_en_US.getWelcomeMessage("en_US");
			System.out.println(displayMessage_en_US.getWelcomeMessage("en_US"));
		});



	}




}
