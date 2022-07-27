package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface CompanyService {


    Optional<Company> getCompanyByKrsNumber(Long krsNumber);

    public ResponseEntity<Company> getCompanyDtoFromKrsApi(String krsNumber);

    public boolean checkForDuplicate(Long krsNumber);

    public Company saveCompany(Company company);

    ResponseEntity<String> buildSaveResponse(Company company);

    public List<Company> findAll();

    public List<Company> getCompaniesByUserId (UUID uuid);
}