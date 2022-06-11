package com.company.naspolke.model.company.companyBodies;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Partners {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany
    private Set<NaturalPerson> partners = new HashSet<>();
    @OneToMany
    private Set<JuridicalPerson> partnerCompanies = new HashSet<>();

    @Builder
    public Partners(Set<NaturalPerson> partners, Set<JuridicalPerson> partnerCompanies) {
        this.partners = partners;
        this.partnerCompanies = partnerCompanies;
    }
}
