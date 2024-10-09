package edu.wgu.d387_sample_code.i18n;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@CrossOrigin
@Component
public class TimeConverter {

    public static String getConvertedTime(int hour, int minute) {
        LocalTime fixedTime = LocalTime.of(hour, minute);
        ZonedDateTime zEastern = ZonedDateTime.now(ZoneId.of("America/New_York")).with(fixedTime);
        ZonedDateTime zMountain = zEastern.withZoneSameInstant(ZoneId.of("America/Denver"));
        ZonedDateTime zUniversal = zEastern.withZoneSameInstant(ZoneId.of("UTC"));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return "ET: " + zEastern.format(formatter) + ", MT: " + zMountain.format(formatter) + ", UTC: " + zUniversal.format(formatter);

    }
}
