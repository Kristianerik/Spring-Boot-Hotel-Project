package edu.wgu.d387_sample_code.i18n;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.InputStream;
import java.util.Properties;

@Component
@CrossOrigin
public class IntroductionMessage {

    public String getWelcomeMessage (String localeIdentifier){
        String resourceName = "translation_" + localeIdentifier + ".properties";
        try (InputStream stream = new ClassPathResource(resourceName).getInputStream()) {
            Properties properties = new Properties();
            properties.load(stream);
            return properties.getProperty("welcome");
        } catch (Exception e) {
            e.printStackTrace();
            // Default welcome message
            return "Welcome";
        }
    }
}


