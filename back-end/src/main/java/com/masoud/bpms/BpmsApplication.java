package com.masoud.bpms;

import com.masoud.bpms.Model.Bpms.ProcessStatus;
import com.masoud.bpms.Utility.Security.Password;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class BpmsApplication {
    public static void main(String[] args) {
		SpringApplication.run(BpmsApplication.class, args);
    }
}
