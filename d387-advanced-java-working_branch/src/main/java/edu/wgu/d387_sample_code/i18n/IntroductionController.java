package edu.wgu.d387_sample_code.i18n;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/welcome")
public class IntroductionController {

    private final IntroductionMessage introductionMessage;

    public IntroductionController(IntroductionMessage introductionMessage){
        this.introductionMessage = introductionMessage;
    }

    @GetMapping("/welcome/{locale}")
    public String getWelcomeMessage(@PathVariable String locale) {
        return introductionMessage.getWelcomeMessage(locale);
    }
}
