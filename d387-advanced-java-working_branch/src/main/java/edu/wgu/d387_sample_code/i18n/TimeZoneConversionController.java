package edu.wgu.d387_sample_code.i18n;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.time.ZonedDateTime;

@RestController
public class TimeZoneConversionController {

    @GetMapping("/api/time-conversion")
    public String getConvertedTime(@RequestParam int hour, @RequestParam int minute){
        return TimeConverter.getConvertedTime(hour, minute);
    }
}
